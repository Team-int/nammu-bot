import { MessageEmbed } from 'discord.js'

export interface DefaultEmbedContent {
  title?: string
  description?: string
  color?: string
}

export default class EmbedGenerator {
  public static successEmbed({
    title,
    description,
    color = '#52c41a',
  }: DefaultEmbedContent): MessageEmbed {
    return new MessageEmbed({ title, description, color })
  }

  public static errorEmbed({
    title,
    description,
    color = '#f5222d',
  }: DefaultEmbedContent) {
    return new MessageEmbed({ title, description, color })
  }

  public static customEmbed({
    title,
    description,
    color = '#faad14',
  }: DefaultEmbedContent) {
    return new MessageEmbed({ title, description, color })
  }
}
