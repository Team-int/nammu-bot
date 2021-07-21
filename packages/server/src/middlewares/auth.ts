import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { URLSearchParams } from 'url'
import { User } from '@src/entities/User'
import daxios from '@src/lib/client/discord'
import CustomError from '@src/lib/CustomError'
import { MiddlewareDefaultOption } from '.'

interface ResponseType {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: 'Bearer'
}

interface authCheckerMiddlewareOption extends MiddlewareDefaultOption {}

const authMiddleware: FastifyPluginCallback<authCheckerMiddlewareOption> = (
  fastify,
  opts,
  done
) => {
  const { throwErrorNonExists } = opts

  fastify.addHook('preHandler', async (req, res) => {
    const access_token = req.session.get('access_token')
    const refresh_token = req.session.get('refresh_token')

    if (!access_token || !refresh_token) return

    const { DISCORD_APP_ID, DISCORD_APP_SECRET } = process.env

    const params = new URLSearchParams()
    params.append('client_id', DISCORD_APP_ID!)
    params.append('client_secret', DISCORD_APP_SECRET!)
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refresh_token as string)

    let token = access_token

    try {
      await daxios.request('GET', {
        url: '/users/@me',
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    } catch (err) {
      try {
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

        req.session.set('refresh_token', data.refresh_token)

        req.session.set('access_token', data.access_token)
      } catch (err) {}
    }

    try {
      const response = await daxios.request('GET', {
        url: '/users/@me',
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      const data = response.data

      const user = await User.findOne(data.id)

      if (throwErrorNonExists && !user) {
        throw new CustomError({
          statusCode: 404,
          name: 'NotFoundError',
          message: 'User not found',
        })
      }

      req.user = user
    } catch (err) {
      throw new CustomError({
        statusCode: 403,
        name: 'ForbiddenError',
        message: 'Invalid token',
      })
    }
  })

  done()
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

export default fp(authMiddleware)
