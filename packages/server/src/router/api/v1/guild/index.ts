import { FastifyPluginCallback } from 'fastify'
import guildCreateRoute from './guildCreate'
import guildModifyRoute from './guildModifyRoute'

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildCreateRoute, { prefix: '' })
  fastify.register(guildModifyRoute, { prefix: '' })

  done()
}

export default guildRoute
