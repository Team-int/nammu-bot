import { Guild } from '@src/entities/Guild'
import { User } from '@src/entities/User'
import { FastifyPluginCallback } from 'fastify'

interface IGuild extends Guild {
  ownerID: string
}

const guildCreateRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post<{ Body: { guild: IGuild } }>('/', async (req, res) => {
    const { guild } = req.body

    const isGuildExists = await Guild.findOne(guild.id)

    if (isGuildExists?.joined === false) {
      isGuildExists.joined = true
      await isGuildExists.save()

      return isGuildExists
    }

    const owner = await User.findOne(guild.ownerID)
    let createdOwner: User | null = null

    if (!owner) {
      createdOwner = await User.create({ id: guild.ownerID }).save()
    }

    const guildEntity = Guild.create(guild)

    guildEntity.owner = (createdOwner || owner) as User // Gurantee createdOwner or owner is User object

    await guildEntity.save()

    return guildEntity
  })
}

export default guildCreateRoute
