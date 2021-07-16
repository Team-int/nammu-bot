import EmbedController from '@src/controllers/embed/embed.controller'
import EmbedService from '@src/controllers/embed/embed.service'
import Command, { CommandModule, Execute } from '@src/lib/commandManager'
import { Message } from 'discord.js'

@Command(['임베드'])
export default class Embed {
  @Execute
  public async execute(message: Message, args: IArguments) {
    const controller = new EmbedController(message, new EmbedService())

    controller.init(args)
  }
}
