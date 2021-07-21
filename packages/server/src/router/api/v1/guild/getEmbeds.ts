import { Embeds } from '@src/entities/Embeds'
import guildChecker from '@src/middlewares/guildChecker'
import { plainToClass } from 'class-transformer'
import { FastifyPluginCallback } from 'fastify'

const getEmbedsRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: true })
  fastify.get('/embeds', getEmbedSchema, async (req, res) => {
    const embeds = await Embeds.createQueryBuilder('embeds')
      .where('fk_guild_id = :id', { id: req.guild!.id })
      .leftJoinAndSelect('embeds.metadata', 'metadata')
      .getMany()

    return res.send(plainToClass(Embeds, embeds))
  })

  done()
}

const getEmbedSchema = {
  schema: {
    description: 'Get all embed of the guild',
    tags: ['guild', 'embed'],
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
    response: {
      '2xx': {
        description: 'Successful reponse',
        type: 'object',
      },
      404: {
        description: 'Guild not found',
        type: 'object',
      },
    },
  },
}

export default getEmbedsRoute
