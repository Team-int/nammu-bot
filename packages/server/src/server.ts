import fastify, { FastifyInstance } from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyCookie from 'fastify-cookie'
import swaggerPlugin from './plugins/swagger'
import rootRoute from './router'
import authMiddleware from './middlewares/auth'
export class Server {
  private _server: FastifyInstance

  constructor() {
    this._server = fastify({ logger: true })

    const { COOKIE_SECRET } = process.env

    this._server.register(fastifyCompress)
    this._server.register(fastifyCookie, {
      secret: COOKIE_SECRET,
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
