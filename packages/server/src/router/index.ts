import { FastifyPluginCallback } from 'fastify'
import apiRoute from './api'

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(apiRoute, { prefix: '/api' })

  done()
}

export default rootRoute
