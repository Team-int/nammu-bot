import Redis from 'ioredis'

const { REDIS_HOST } = process.env
const { REDIS_PORT } = process.env

export const redisClient = new Redis(REDIS_HOST, { port: Number(REDIS_PORT) })
