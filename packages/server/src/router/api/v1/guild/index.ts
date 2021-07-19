import { FastifyPluginCallback } from 'fastify'
import getEmbedsRoute from './getEmbeds'
import getGuildRoute from './getGuild'
import guildCreateRoute from './guildCreate'
import guildModifyRoute from './guildModifyRoute'

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildCreateRoute, { prefix: '' })
  fastify.register(guildModifyRoute, { prefix: '' })
  fastify.register(getEmbedsRoute, { prefix: '' })
  fastify.register(getGuildRoute, { prefix: '' })

  done()
}

export default guildRoute
