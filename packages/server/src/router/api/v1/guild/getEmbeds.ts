import { Embeds } from '@src/entities/Embeds'
import guildChecker from '@src/middlewares/guildChecker'
import { plainToClass } from 'class-transformer'
import { FastifyPluginCallback } from 'fastify'

const getEmbedsRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: true })
  fastify.get('/embeds', async (req, res) => {
    const embeds = await Embeds.createQueryBuilder('embeds')
      .where('fk_guild_id = :id', { id: req.guild!.id })
      .leftJoinAndSelect('embeds.metadata', 'metadata')
      .getMany()

    return plainToClass(Embeds, embeds)
  })

  done()
}

export default getEmbedsRoute
