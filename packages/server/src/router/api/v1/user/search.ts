import { User } from '@src/entities/User'
import { FastifyPluginCallback } from 'fastify'

const searchRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get<{ Querystring: { search: string } }>('/id', async (req, res) => {
    const { search } = req.query

    const user = await User.findOne(search)

    return user
  })

  done()
}

export default searchRoute
