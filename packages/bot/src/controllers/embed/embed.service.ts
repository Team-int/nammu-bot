import client from '@src/lib/client/server'
import { AxiosResponse } from 'axios'
import { Message } from 'discord.js'

export default class EmbedService {
  constructor() {}

  async create(message: Message, embed_name?: string) {
    const guild_id = message.guild?.id

    if (!guild_id)
      return message.channel.send('DM에서 사용할 수 없는 명령어입니다') // TODO: Create Guild not found error embed
    if (!embed_name) return message.channel.send('임베드의 이름을 지어주세요')

    try {
      const response = await client.post(
        `/api/v1/embed/create`,
        {
          embed_name,
        },
        {
          headers: {
            guild_id,
          },
        }
      )

      return message.channel.send(`성공적으로 임베드를 생성했어요`)
    } catch (err) {
      const response: AxiosResponse = err.response

      console.log(response.data)

      switch (response.status) {
        case 404:
          return message.channel.send('서버를 찾지 못했어요 ,,')
        case 403:
          return message.channel.send('당신의 멋진 서버에 초대해 주실레요?')
        case 400:
          return message.channel.send('그 멋진 이름은 이미 사용중이네요')
      }
    }
  }
}
