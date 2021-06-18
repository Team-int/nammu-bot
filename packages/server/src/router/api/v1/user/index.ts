import { FastifyPluginCallback } from 'fastify'
import searchRoute from './search'

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(searchRoute, { prefix: '/search' })

  done()
}

export default userRoute
