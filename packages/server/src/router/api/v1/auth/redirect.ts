import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify'

const redirectRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{ Querystring: { code?: string } }>(
    '/',
    redirectRouteSchema,
    async (req, res) => {
      const { DISCORD_APP_ID, DISCORD_REDIRECT_URL } = process.env

      const REDIRECT_URL = `http://discord.com/api/oauth2/authorize?client_id=${DISCORD_APP_ID}&redirect_uri=${DISCORD_REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds`

      return res.redirect(REDIRECT_URL)
    }
  )

  done()
}

const redirectRouteSchema: RouteShorthandOptions = {
  schema: {},
}

export default redirectRoute
