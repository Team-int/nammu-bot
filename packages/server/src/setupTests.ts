import './lib/env'
import { Server } from './server'
import { Database } from './database'

export const server = new Server({
  logger: { level: 'info', prettyPrint: true },
})
export const database = new Database()

database.connect().then(() => {
  process.exit()
})
