import client from '@src/lib/client/server'
import Event, { Execute } from '@src/lib/eventManager'
import { Guild } from 'discord.js'

@Event('guildDelete')
export default class onGuildLeave {
  @Execute
  public execute(guild: Guild) {
    try {
      client.patch(
        `/api/v1/guild/leave`,
        {},
        {
          headers: {
            guild_id: guild,
          },
        }
      )
    } catch (e) {}
  }
}
