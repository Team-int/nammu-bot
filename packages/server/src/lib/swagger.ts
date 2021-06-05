import { SwaggerOptions } from 'fastify-swagger'

const options: SwaggerOptions = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Nammu Document',
      description: 'API docs for Nammu Document',
      version: '0.1.0',
    },
    host: 'localhost',
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
}

export default options
