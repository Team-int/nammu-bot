import daxios from '@src/lib/client/discord'
import auth from '@src/middlewares/auth'
import { FastifyPluginCallback } from 'fastify'

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(auth, {})
  fastify.get('/', async (req, res) => {
    const token = req.cookies['access_token']

    const response = await daxios.request('GET', {
      url: '/users/@me',
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    return res.status(200).send({ data: response.data })
  })

  done()
}

export default meRoute
