import { FastifyPluginCallback } from 'fastify'
import createEmbedRoute from './create'

const embedRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(createEmbedRoute, { prefix: '/create' })

  done()
}

export default embedRoute
