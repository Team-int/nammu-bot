import { Embeds } from '@src/entities/Embeds'
import CustomError from '@src/lib/CustomError'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { MiddlewareDefaultOption } from '.'

interface embedCheckerMiddlewareOption extends MiddlewareDefaultOption {
  type: 'id' | 'name'
}

const embedCheckerMiddleware: FastifyPluginCallback<embedCheckerMiddlewareOption> =
  (fastify, opts, done) => {
    const { throwErrorNonExists, type = 'id' } = opts

    fastify.addHook('preHandler', async (req, res) => {
      const id = req.headers['embed_id'] as string
      const name = req.headers['embed_name'] as string

      const value = type === 'id' ? id : name

      const embeds = await Embeds.createQueryBuilder('embeds')
        .where(`embeds.${type} = :value`, { value })
        .leftJoinAndSelect('embeds.metadata', 'metadata')
        .getMany()

      if (throwErrorNonExists && embeds.length === 0)
        throw new CustomError({
          statusCode: 404,
          name: 'NotFoundError',
          message: 'Embed not found',
        })

      req.embed = embeds
    })

    done()
  }

declare module 'fastify' {
  interface FastifyRequest {
    embed?: Array<Embeds>
  }
}

export default fp(embedCheckerMiddleware)
