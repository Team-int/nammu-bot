import { FastifyPluginCallback } from 'fastify'
import callbackRoute from './callback'
import redirectRoute from './redirect'

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(redirectRoute, { prefix: '' })
  fastify.register(callbackRoute, { prefix: '/callback' })

  done()
}

export default authRoute
