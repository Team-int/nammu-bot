import { Embeds } from '@src/entities/Embeds'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const embedCheckerMiddleware: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.addHook('preHandler', async (req, res) => {
    const id = req.headers['embed_id'] as string
    const name = req.headers['embed_name'] as string

    const embeds = await Embeds.createQueryBuilder()
      .where('id = :id AND name = :name', { id, name })
      .leftJoinAndSelect('embeds.metadata', 'metadata')
      .getMany()

    return embeds[0] || null
  })

  done()
}

declare module 'fastify' {
  interface FastifyRequest {
    embed?: Embeds
  }
}

export default fp(embedCheckerMiddleware)
