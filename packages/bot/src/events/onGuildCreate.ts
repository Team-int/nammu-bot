import Event, { Execute } from '@src/lib/eventManager'
import client from '@src/lib/client/server'
import { Channel, Guild } from 'discord.js'

@Event('guildCreate')
export default class onGuildCreate {
  @Execute
  public execute(guild: Guild) {
    try {
      client.post('/api/v1/guild', { guild }, {})
    } catch (e) {}
  }
}
