import { autoInjectable } from 'tsyringe'
import { Message } from 'discord.js'
import EmbedService from './embed.service'

@autoInjectable()
export default class EmbedController {
  constructor(private readonly service?: EmbedService) {}

  async init(message: Message, args: IArguments) {
    switch (args[0]) {
      case '생성':
        return await this.service?.create(message, args[1])
    }
  }
}
