import { FastifyPluginCallback } from 'fastify'
import meRoute from './@me'
import authRoute from './auth'
import userRoute from './user'

const versionOneRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(userRoute, { prefix: '/user' })
  fastify.register(meRoute, { prefix: '/@me' })

  done()
}

export default versionOneRoute
