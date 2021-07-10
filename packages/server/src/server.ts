import fastify, { FastifyInstance } from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCookie from 'fastify-cookie'
import fastifyCors from 'fastify-cors'
import fastifySession from '@mgcrea/fastify-session'
import fastifyRedis from 'fastify-redis'
import swaggerPlugin from './plugins/swagger'
import rootRoute from './router'
import { redisClient } from './redis'
export class Server {
  private _server: FastifyInstance

  constructor() {
    this._server = fastify({ logger: true })

    const { SESSION_SECRET } = process.env

    if (!SESSION_SECRET) throw new Error('Session Secret not found')

    this._server.register(fastifyCors, { origin: true, credentials: true })
    this._server.register(fastifyCompress)
    this._server.register(fastifyCookie)
    this._server.register(fastifyRedis, {
      client: redisClient,
    })
    this._server.register(fastifySession, {
      key: SESSION_SECRET,
      store: this._server.redis,
      cookieName: 'qid',
      cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    })
    this._server.register(swaggerPlugin)

    this._server.register(rootRoute, { prefix: '/' })
  }

  public listen(port?: number) {
    const { PORT = port } = process.env

    if (!PORT) throw new Error('PORT not found')

    this._server.listen(PORT).catch((err) => this._server.log.error(err))
  }

  get server() {
    return this._server
  }
}
