import { FastifyPluginCallback } from 'fastify'
import guildRoute from './guilds'
import rootRoute from './me'

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(rootRoute, { prefix: '' })
  fastify.register(guildRoute, { prefix: '/guilds' })

  done()
}

export default meRoute
