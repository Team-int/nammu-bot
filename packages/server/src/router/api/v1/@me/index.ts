import { FastifyPluginCallback } from 'fastify'
import rootRoute from './me'

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(rootRoute, { prefix: '' })

  done()
}

export default meRoute
