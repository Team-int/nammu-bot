import './lib/env'
import 'reflect-metadata'
import { Server } from './server'
import { Database } from './database'

const server = new Server()
const database = new Database()

database.connect().then(() => {
  server.server.log.info('Database connected')
  server.listen()
})
