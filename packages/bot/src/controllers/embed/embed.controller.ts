import { autoInjectable } from 'tsyringe'
import { Message } from 'discord.js'
import EmbedService from './embed.service'
import { CommandController, TArguments } from '@src/lib/commandManager'

@autoInjectable()
export default class EmbedController extends CommandController {
  constructor(private readonly service?: EmbedService) {
    super()
  }

  async init(message: Message, args: TArguments) {
    if (!args) return false

    switch (args[0]) {
      case '생성':
        return await this.service?.create(message, args[1])
    }
  }
}
