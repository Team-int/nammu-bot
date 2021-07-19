import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'

const getGuildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: false })
  fastify.get('/', async (req, res) => {
    return req.guild
  })
}

export default getGuildRoute
