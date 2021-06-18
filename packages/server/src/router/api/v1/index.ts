import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
import userRoute from './user'

const versionOneRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(userRoute, { prefix: '/user' })

  done()
}

export default versionOneRoute
