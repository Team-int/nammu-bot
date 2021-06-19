import Command, { Execute, TArguments } from '../lib/commandManager'
import { Message, MessageEmbed } from 'discord.js'
import axios from 'axios'

@Command(['봇공지'])
export default class BotNotice {
  private notice: Array<string> = []

  @Execute
  public async execute(message: Message, args: TArguments) {
    const user = message.author

    const foundUser = await axios.get(
      `http://localhost:5000/api/v1/user/search/id?${user.id}`
    )

    if (!foundUser.data.developer) {
      return
    }

    if (!args || args.length === 0) {
      return message.reply('사용법 `##봇공지 (제목|설명|내용|보내기) [내용]`')
    }

    switch (args[0]) {
      case '제목':
        this.setNoticeContent(args[0], args[1])
        break
      case '설명':
        this.setNoticeContent(args[0], args[1])
        break
      case '내용':
        this.setNoticeContent(args[0], args[1])
        break
      case '보내기':
        this.sendMessage()
        break
      default:
        return message.reply('사용법 `##봇공지 (제목|설명|내용|보내기) [내용]`')
    }
  }

  private setNoticeContent = (
    type: '제목' | '설명' | '내용',
    content: string
  ) => {
    const types = ['제목', '설명', '내용']

    this.notice[types.indexOf(type)] = content
  }

  private sendMessage = () => {
    // TODO: Get all guilds and notice channel
    // TODO: Generate embed
    // TODO: Send message to TextChannel
  }
}
