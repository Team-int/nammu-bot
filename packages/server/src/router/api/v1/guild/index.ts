import { FastifyPluginCallback } from 'fastify'
import getEmbedsRoute from './getEmbeds'
import getGuildRoute from './getGuild'
import guildCreateRoute from './guildCreate'
import guildModifyRoute from './modify'

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildCreateRoute, { prefix: '' })
  fastify.register(getEmbedsRoute, { prefix: '' })
  fastify.register(getGuildRoute, { prefix: '' })
  fastify.register(guildModifyRoute, { prefix: '/modify' })

  done()
}

export default guildRoute
