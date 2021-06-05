import { FastifyPluginCallback } from 'fastify'
import versionOneRoute from './v1'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(versionOneRoute, { prefix: '/v1' })

  done()
}

export default apiRoute
