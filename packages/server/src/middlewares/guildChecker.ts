import { Guild } from '@src/entities/Guild'
import CustomError from '@src/lib/CustomError'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { MiddlewareDefaultOption } from '.'

interface guildCheckerMiddlewareOption extends MiddlewareDefaultOption {}

export interface guildCheckerMiddlewareHeaders {
  guild_id: string
}

const guildCheckerMiddleware: FastifyPluginCallback<guildCheckerMiddlewareOption> =
  (fastify, opts, done) => {
    const { throwErrorNonExists = false } = opts

    fastify.addHook('preHandler', async (req, res) => {
      const id = req.headers['guild_id'] as string

      const guild = await Guild.createQueryBuilder('guilds')
        .where('guilds.id = :guildid', { guildid: id })
        .leftJoinAndSelect('guilds.metadata', 'metadata')
        .getOne()

      if (throwErrorNonExists && !guild)
        throw new CustomError({
          statusCode: 404,
          name: 'NotFoundError',
          message: 'Guild not found',
        })

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
