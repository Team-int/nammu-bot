import { EmbedData, EmbedMetadata } from '@src/entities/EmbedMetadata'
import { Embeds } from '@src/entities/Embeds'
import CustomError from '@src/lib/CustomError'
import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'

interface CreateEmbedBody {
  embed_name: string
  data?: EmbedData
}

const createEmbedRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: true })
  fastify.post<{
    Body: CreateEmbedBody
  }>('/', createEmbedSchema, async (req, res) => {
    const { body, guild } = req
    const { embed_name: name, data = {} } = body

    if (!guild?.joined)
      throw new CustomError({
        statusCode: 403,
        name: 'ForbiddenError',
        message: 'Bot is not joined the guild',
      })

    const exists = await getRepository(Embeds)
      .createQueryBuilder()
      .where('name = :name AND fk_guild_id = :id', { name, id: guild.id })
      .getOne()

    if (exists) {
      throw new CustomError({
        statusCode: 400,
        name: 'BadRequestError',
        message: 'Embed name for guild is already exists',
      })
    }

    const embed = await Embeds.create({ name, guild }).save()
    const meta = await EmbedMetadata.create({ embed, ...data }).save()

    return res.send({ embed: { ...embed, meta } })
  })

  done()
}

const createEmbedSchema = {
  schema: {
    description: 'Create embed',
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
  },
}

export default createEmbedRoute
