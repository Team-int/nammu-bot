import { Guild } from '@src/entities/Guild'
import auth from '@src/middlewares/auth'
import { FastifyPluginCallback } from 'fastify'

const guildRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(auth, {})
  fastify.get('/', async (req, res) => {
    if (!req.user) return res.status(401).send({ message: 'User not found' })

    const userID = req.user.id

    const guilds = await Guild.find({ where: { owner_id: userID } })

    return res.status(200).send({ guilds })
  })

  done()
}

export default guildRoute
