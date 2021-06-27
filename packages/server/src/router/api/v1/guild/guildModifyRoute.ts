import { Guild } from '@src/entities/Guild'
import { FastifyPluginCallback } from 'fastify'

type modifyType = 'guildDelete'

interface ServiceType {
  StatusCode: number
  message?: string
  guild?: any
}

const guildModifyRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.patch<{ Querystring: { type: modifyType }; Params: { id: string } }>(
    '/:id',
    async (req, res) => {
      const id = req.params['id']
      const type = req.query['type']

      switch (type) {
        case 'guildDelete':
          const response = await guildDelete(id)

          res
            .status(response.StatusCode)
            .send({ message: response.message, guild: response.guild })
        default:
          return res.status(400).send({ message: 'Invalid type' })
      }
    }
  )

  done()
}

const guildDelete = async (id: string): Promise<ServiceType> => {
  const guild = await Guild.findOne(id)

  if (!guild) return { StatusCode: 403, message: 'Guild not found' }

  guild.joined = false

  await guild.save()

  return { StatusCode: 200, guild }
}

export default guildModifyRoute
