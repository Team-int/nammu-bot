import { Guild } from '@src/entities/Guild'
import { User } from '@src/entities/User'
import {
  FastifyPluginCallback,
  RouteShorthandOptions,
  FastifySchema,
} from 'fastify'

interface IGuild extends Guild {
  ownerID: string
}

const guildCreateRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post<{ Body: { guild: IGuild } }>(
    '/',
    guildCreateSchema,
    async (req, res) => {
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
    }
  )

  done()
}

const guildCreateSchema = {
  schema: {
    description: 'Insert guild when bot joined',
    tags: ['guild', 'bot-only'],
    body: {
      type: 'object',
      required: ['id', 'joined', 'owner', 'users', 'name', 'ownerID'],
      properties: {
        id: { type: 'string', description: 'guild id' },
        joined: { type: 'boolean', description: 'Is bot joined' },
        owner: { type: 'object', description: "guild's owner" },
        users: {
          type: 'array',
          items: { type: 'object' },
          description: "guild's users",
        },
        name: { type: 'string', description: 'guild name' },
        ownerID: { type: 'string', description: "owner's id" },
      },
    },
    response: {
      '2xx': {
        description: 'Successful response',
        type: 'object',
      },
    },
  },
}

export default guildCreateRoute
