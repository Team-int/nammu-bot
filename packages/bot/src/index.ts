import './env'
import { client } from './client'
import { Server } from './server'

const server = new Server()

server.listen()
client.login()
