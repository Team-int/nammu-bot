import EmbedController from '@src/controllers/embed/embed.controller'
import Command, { Execute } from '@src/lib/commandManager'
import { Message } from 'discord.js'

@Command(['임베드'])
export default class Embed {
  @Execute
  public async execute(message: Message, args: IArguments) {
    const controller = new EmbedController()
    await controller.init(message, args)
  }
}
