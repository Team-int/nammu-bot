import client from '@src/lib/client/server'
import EmbedGenerator from '@src/util/embedGenerator'
import { AxiosError } from 'axios'
import { Message } from 'discord.js'

export default class EmbedService {
  async create(message: Message, embed_name?: string) {
    const guild_id = message.guild?.id

    if (!guild_id) return message.reply('DM에서 사용할 수 없는 명령어입니다')
    if (!embed_name) return message.reply('임베드의 이름을 지어주세요')

    const waitMsg = await message.channel.send('잠시만요...')

    try {
      await client.post(
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

      await waitMsg.delete()

      const successEmbed = EmbedGenerator.successEmbed({
        title: '성공',
        description: `<@${message.author.id}>, 성공적으로 \`${embed_name}\` 임베드를 생성했어요`,
      })

      message.channel.send(successEmbed)
    } catch (err) {
      await waitMsg.delete()

      const response = (err as AxiosError).response

      if (!response) return message.channel.send('현재 점검중입니다')

      const errorEmbed = EmbedGenerator.errorEmbed({ title: '어이쿠..' })

      switch (response.status) {
        case 404:
          errorEmbed.setDescription(
            `<@${message.author.id}>, 서버를 찾지 못했어요`
          )
          break
        case 403:
          errorEmbed.setDescription(
            `<@${message.author.id}>, 당신의 멋진 서버에 초대해 주실레요?`
          )
          break
        case 400:
          errorEmbed.setDescription(
            `<@${message.author.id}>, 그 멋진 이름은 이미 사용중이네요`
          )
          break
      }

      message.channel.send(errorEmbed)
    }
  }
}
