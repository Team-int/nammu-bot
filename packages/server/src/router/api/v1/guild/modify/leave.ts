import { FastifyPluginCallback } from 'fastify'

const guildModifyLeaveRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.patch('/', guildModifyLeaveSchema, async (req, res) => {
    const guild = req.guild!

    guild.joined = false

    await guild.save()

    return res.status(204).send()
  })

  done()
}

const guildModifyLeaveSchema = {
  schema: {
    description: "Modify guild's joinable when bot leaves",
    tags: ['guild', 'bot-only'],
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

export default guildModifyLeaveRoute
