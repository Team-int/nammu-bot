import { User } from '@src/entities/User'
import { FastifyPluginCallback } from 'fastify'

const isDeveloperRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{ Querystring: { search: string } }>('/id', async (req, res) => {
    const { search } = req.query

    const user = await User.findOne(search)

    return user?.developer
  })

  done()
}

export default isDeveloperRoute
