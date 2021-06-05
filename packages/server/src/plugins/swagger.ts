import fp from 'fastify-plugin'
import fastifySwagger from 'fastify-swagger'

export default fp(async (fastify) => {
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
  })

  fastify.ready(() => {
    fastify.swagger()
  })
})
