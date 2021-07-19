import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'

const guildModifyRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: true })
  fastify.patch('/leave', async (req, res) => {
    const guild = req.guild!

    guild.joined = false

    await guild.save()

    return res.status(204).send()
  })

  fastify.patch<{ Querystring: { name: string } }>(
    '/change-name',
    async (req, res) => {
      if (!req.guild)
        return res.status(404).send({ message: 'Guild not found' })

      const name = decodeURIComponent(req.query['name'])

      fastify.log.info({ guild: req.guild })
      fastify.log.info({ headers: req.headers })

      if (!name)
        return res.status(400).send({ message: 'Name parameter not found' })

      const guild = req.guild

      guild.name = name

      await guild.save()

      return res.status(204).send()
    }
  )

  done()
}

export default guildModifyRoute
