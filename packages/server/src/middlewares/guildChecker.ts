import { Guild } from '@src/entities/Guild'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

interface guildCheckerMiddlewareOption {
  throwErrorNonExists?: boolean
}

const guildCheckerMiddleware: FastifyPluginCallback<guildCheckerMiddlewareOption> =
  (fastify, opts, done) => {
    const { throwErrorNonExists = false } = opts

    fastify.addHook('preHandler', async (req, res) => {
      const id = req.headers['guild_id'] as string

      if (throwErrorNonExists)
        return res.status(404).send({ message: 'Guild not found' })

      const guild = await Guild.createQueryBuilder('guilds')
        .where('id = :id', { id })
        .leftJoinAndSelect('guilds.metadata', 'metadata')
        .getOne()

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
