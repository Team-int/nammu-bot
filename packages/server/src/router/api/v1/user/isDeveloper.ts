import { User } from '@src/entities/User'
import { FastifyPluginCallback } from 'fastify'

const isDeveloperRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{ Querystring: { id: string } }>('/', async (req, res) => {
    const { id } = req.query

    const user = await User.findOne(id)

    return user?.developer
  })

  done()
}

export default isDeveloperRoute
