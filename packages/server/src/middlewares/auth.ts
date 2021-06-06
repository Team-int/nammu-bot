import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import axios from 'axios'
import { URLSearchParams } from 'url'
import { User } from '@src/entities/User'

interface ResponseType {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: 'Bearer'
}

const authMiddleware: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('preHandler', async (req, res) => {
    const { access_token, refresh_token } = req.cookies

    if (!access_token || !refresh_token) return

    const { DISCORD_APP_ID, DISCORD_APP_SECRET } = process.env

    const params = new URLSearchParams()
    params.append('client_id', DISCORD_APP_ID!)
    params.append('client_secret', DISCORD_APP_SECRET!)
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refresh_token)

    let token = access_token

    try {
      await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    } catch (err) {
      try {
        const response = await axios.post(
          'https://discord.com/api/v8/oauth2/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )

        const data = response.data as ResponseType

        token = data.access_token

        res.setCookie('refresh_token', data.refresh_token, {
          maxAge: data.expires_in,
          path: '/',
        })

        res.setCookie('access_token', data.access_token, {
          path: '/',
        })
      } catch (err) {
        return
      }
    }

    const response = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = response.data

    const user = await User.findOne(data.id)

    req.user = user
  })

  done()
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

export default fp(authMiddleware)
