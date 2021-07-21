import { Guild } from '@src/entities/Guild'
import auth from '@src/middlewares/auth'
import { FastifyPluginCallback } from 'fastify'

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(auth, { throwErrorNonExists: true })
  fastify.get('/', async (req, res) => {
    const { user } = req

    const guilds = await Guild.find({ where: { owner: user } })

    return res.status(200).send({ guilds })
  })

  done()
}

export default guildRoute
