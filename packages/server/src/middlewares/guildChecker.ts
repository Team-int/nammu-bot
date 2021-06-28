import { Guild } from '@src/entities/Guild'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const guildCheckerMiddleware: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('preHandler', async (req, res) => {
    const id = req.headers['guild_id']

    if (typeof id !== 'string')
      return res.status(400).send({ message: 'Invalid guild id' })

    const guild = await Guild.findOne({ id })

    if (!guild) return res.status(404).send({ message: 'Guild not found' })

    req.guild = guild
  })

  done()
}

declare module 'fastify' {
  interface FastifyRequest {
    guild?: Guild
  }
}

export default fp(guildCheckerMiddleware)
