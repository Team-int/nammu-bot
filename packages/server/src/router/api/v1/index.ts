import { FastifyPluginCallback } from 'fastify'
import meRoute from './@me'
import authRoute from './auth'
import guildRoute from './guild'
import userRoute from './user'

const versionOneRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(userRoute, { prefix: '/user' })
  fastify.register(meRoute, { prefix: '/@me' })
  fastify.register(guildRoute, { prefix: '/guild' })

  done()
}

export default versionOneRoute
