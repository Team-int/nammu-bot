import { Client, ClientEvents, Message } from 'discord.js'
import { readdirSync } from 'fs'

type TArgument = Array<string> | null
type TExecute<T = void> = (message: Message, args: TArgument) => T
type TEventExecute = (...args: any[]) => void

interface ICommand {
  command: Array<string> | string
  execute: TExecute<void>
}
interface IEvent {
  event: keyof ClientEvents
  execute: TEventExecute
}

class BotClient {
  public client: Client

  private commands = new Map<string, TExecute>()
  private prefix: string

  constructor() {
    this.client = new Client()
    this.prefix = process.env.PREFIX || '##'

    this.handleCommand()
    this.handleEvent()

    this.client.on('message', this.commandChecker.bind(this))
  }

  public login() {
    const { TOKEN } = process.env

    if (!TOKEN) throw new Error('There are no token inside your env file')

    this.client
      .login(TOKEN)
      .then(() => console.log('Discord bot is running now'))
  }

  private handleCommand() {
    const commandDir = './src/commands'
    const commandFiles = readdirSync(commandDir).filter((file) =>
      file.endsWith('.ts')
    )

    for (const file of commandFiles) {
      const Command = require(`./commands/${file}`).default

      const { command: cmd, execute }: ICommand = new Command()

      if (typeof cmd === 'string') this.commands.set(cmd, execute)
      else {
        for (const command of cmd) {
          this.commands.set(command, execute)
        }
      }
    }
  }

  private handleEvent() {
    const eventDir = './src/events'
    const eventFiles = readdirSync(eventDir).filter((file) =>
      file.endsWith('.ts')
    )

    for (const file of eventFiles) {
      const Event = require(`./events/${file}`).default

      const { event, execute }: IEvent = new Event()
      this.client.on(event, execute)
    }
  }

  private async commandChecker(message: Message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return

    const args = message.content.slice(this.prefix.length).trim().split(/ +/)
    const command = args?.shift()?.toLocaleLowerCase() || ''

    if (!this.commands.has(command)) {
      // TODO: help command
      return
    }

    try {
      const func = this.commands.get(command) || function () {}
      await func(message, args)
    } catch (err) {
      message.reply('애러가 발생했어요')
      console.error(err)
    }
  }
}

export const client = new BotClient()
