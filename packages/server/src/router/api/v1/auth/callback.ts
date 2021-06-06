import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify'
import { URLSearchParams } from 'url'
import { User } from '@src/entities/User'
import daxios from '@src/lib/client/discord'

interface ResponseType {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: 'Bearer'
}

const callbackRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{ Querystring: { code: string } }>(
    '/',
    callbackRouteSchema,
    async (req, res) => {
      const { code } = req.query
      const { DISCORD_APP_ID, DISCORD_REDIRECT_URL, DISCORD_APP_SECRET } =
        process.env

      const params = new URLSearchParams()
      params.append('client_id', DISCORD_APP_ID!)
      params.append('client_secret', DISCORD_APP_SECRET!)
      params.append('grant_type', 'authorization_code')
      params.append('code', code)
      params.append('redirect_uri', DISCORD_REDIRECT_URL!)

      const response = await daxios.request('POST', {
        url: '/v8/oauth2/token',
        options: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        payload: params,
      })

      const data = response.data as ResponseType

      const meResponse = await daxios.request('GET', {
        url: '/users/@me',
        options: {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      })

      const user = await User.findOne(meResponse.data.id)

      if (!user) {
        const data = meResponse.data as User

        await User.create(data).save()
      }

      res.setCookie('refresh_token', data.refresh_token, {
        maxAge: data.expires_in,
        path: '/',
      })

      res.setCookie('access_token', data.access_token, {
        path: '/',
      })

      return data
    }
  )

  done()
}

const callbackRouteSchema: RouteShorthandOptions = {
  schema: {
    querystring: {
      code: { type: 'string' },
    },
  },
}

export default callbackRoute
