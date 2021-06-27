import { Guild } from '@src/entities/Guild'
import { FastifyPluginCallback } from 'fastify'
import guildModifyRoute from './guildModifyRoute'

interface IGuild extends Guild {
  ownerID: string
}

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post<{ Body: { guild: IGuild } }>('/', async (req, res) => {
    const { guild } = req.body

    const isGuildExists = await Guild.findOne(guild.id)

    if (isGuildExists?.joined === false) {
      isGuildExists.joined = true
      await isGuildExists.save()

      return isGuildExists
    }

    const guildEntity = Guild.create(guild)

    guildEntity.owner_id = guild.ownerID

    await guildEntity.save()

    return guildEntity
  })

  fastify.register(guildModifyRoute, { prefix: '' })

  done()
}

export default guildRoute