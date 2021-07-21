import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'

const getGuildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: false })
  fastify.get('/', getGuildSchema, async (req, res) => {
    return req.guild
  })

  done()
}

const getGuildSchema = {
  schema: {
    description: 'Get guild by id',
    tags: ['guild'],
    headers: {
      type: 'object',
      required: ['guild_id'],
      properties: {
        guild_id: {
          type: 'string',
          description: 'Guild id that want to find out',
        },
      },
    },
  },
}

export default getGuildRoute
