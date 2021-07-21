import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify'
import { URLSearchParams } from 'url'
import { User } from '@src/entities/User'
import daxios from '@src/lib/client/discord'
import CustomError from '@src/lib/CustomError'

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

      let meResponse: any

      try {
        meResponse = await daxios.request('GET', {
          url: '/users/@me',
          options: {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          },
        })
      } catch (err) {
        throw new CustomError({
          statusCode: 403,
          name: 'ForbiddenError',
          message: 'Something went wrong',
        })
      }

      const user = await User.findOne(meResponse.data.id)

      if (!user) {
        const data = meResponse.data as User

        await User.create(data).save()
      } else if (!user.email) {
        const data = meResponse.data as User

        const uUser = User.create(data)

        await uUser.save()
      }

      req.session.set('refresh_token', data.refresh_token)

      req.session.set('access_token', data.access_token)

      res.redirect(`${process.env.CLIENT_URL}/auth/login`)

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
