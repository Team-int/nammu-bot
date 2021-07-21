import { FastifyPluginCallback } from 'fastify'

const guildModifyChangeNameRoute: FastifyPluginCallback = (
  fastify,
  opts,
  done
) => {
  fastify.patch<{ Querystring: { name: string } }>(
    '/',
    guildModifyChangeNameSchema,
    async (req, res) => {
      const name = decodeURIComponent(req.query['name'])

      const guild = req.guild!

      guild.name = name

      await guild.save()

      return res.status(204).send()
    }
  )

  done()
}

const guildModifyChangeNameSchema = {
  schema: {
    description: "Modify guild's name when guild name changes",
    tags: ['guild', 'bot-only'],
    querystring: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', description: 'name that has been changed' },
      },
    },
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

export default guildModifyChangeNameRoute
