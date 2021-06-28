import client from '@src/lib/client/server'
import Event, { Execute } from '@src/lib/eventManager'
import { Guild } from 'discord.js'

@Event('guildUpdate')
export default class onGuildUpdate {
  @Execute
  public async execute(oldGuild: Guild, newGuild: Guild) {
    const headers = {
      guild_id: newGuild.id,
    }
    try {
      if (oldGuild.ownerID !== newGuild.ownerID)
        await client.patch(
          `/api/v1/guild/change-owner?id=${newGuild.ownerID}`,
          {},
          {
            headers,
          }
        )

      if (oldGuild.name !== newGuild.name) {
        await client.patch(
          `/api/v1/guild/change-name?name=${encodeURIComponent(newGuild.name)}`,
          {},
          {
            headers,
          }
        )
      }
    } catch (err) {
      console.log(err)
    }

    return
  }
}
