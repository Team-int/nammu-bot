import guildChecker from '@src/middlewares/guildChecker'
import { FastifyPluginCallback } from 'fastify'
import guildModifyChangeNameRoute from './changeName'
import guildModifyLeaveRoute from './leave'

const guildModifyRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(guildChecker, { throwErrorNonExists: true })
  fastify.register(guildModifyChangeNameRoute, { prefix: '/change-name' })
  fastify.register(guildModifyLeaveRoute, { prefix: '/leave' })

  done()
}

export default guildModifyRoute
