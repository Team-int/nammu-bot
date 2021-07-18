import { autoInjectable } from 'tsyringe'
import { Message } from 'discord.js'
import EmbedService from './embed.service'
import { TArguments } from '@src/lib/commandManager'

@autoInjectable()
export default class EmbedController {
  constructor(private readonly service?: EmbedService) {}

  async init(message: Message, args: TArguments) {
    if (!args) return false

    switch (args[0]) {
      case '생성':
        return await this.service?.create(message, args[1])
    }
  }
}
