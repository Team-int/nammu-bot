import { FastifyPluginCallback } from 'fastify'
import searchRoute from './search'
import isDeveloperRoute from './isDeveloper'

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(searchRoute, { prefix: '/search' })
  fastify.register(isDeveloperRoute, { prefix: '/developer' })

  done()
}

export default userRoute
