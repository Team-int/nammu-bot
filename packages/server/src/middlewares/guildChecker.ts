import { Guild } from '@src/entities/Guild'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const guildCheckerMiddleware: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('preHandler', async (req, res) => {
    const id = req.headers['guild_id'] as string

    const guild = await Guild.findOne({ id })

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
