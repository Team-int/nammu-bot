import fp from 'fastify-plugin'
import fastifySwagger from 'fastify-swagger'

export default fp((fastify) => {
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
  })
})
