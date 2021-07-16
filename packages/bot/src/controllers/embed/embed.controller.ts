import { CommandController } from '@src/lib/commandManager'
import { Message } from 'discord.js'
import EmbedService from './embed.service'

export default class EmbedController extends CommandController {
  constructor(message: Message, private readonly service: EmbedService) {
    super(message)
  }

  async init(args: IArguments) {
    switch (args[0]) {
      case '생성':
        return await this.service.create(this.message, args[1])
    }
  }
}
