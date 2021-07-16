import { EmbedData, EmbedMetadata } from '@src/entities/EmbedMetadata'
import { Embeds } from '@src/entities/Embeds'
import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'

interface CreateEmbedBody {
  embed_name: string
  data?: EmbedData
}

interface CreateEmbedQueryString {
  guild_id: string
}

const createEmbedRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, {})
  fastify.post<{ Body: CreateEmbedBody; Querystring: CreateEmbedQueryString }>(
    '/',
    async (req, res) => {
      const { body, guild } = req
      const { embed_name: name, data = {} } = body

      if (!guild) return res.status(404).send({ message: 'Guild not found' })
      if (!guild.joined)
        return res.status(403).send({ message: 'Bot is not joined the guild' })

      const exists = await getRepository(Embeds)
        .createQueryBuilder()
        .where('name = :name AND fk_guild_id = :id', { name, id: guild.id })
        .getOne()

      if (exists) {
        return res
          .status(400)
          .send({ message: 'Embed name for guild is already exists' })
      }

      const embed = await Embeds.create({ name, guild }).save()
      const meta = await EmbedMetadata.create({ embed, ...data }).save()

      return res.status(201).send({ embed: { ...embed, meta } })
    }
  )

  done()
}

export default createEmbedRoute
