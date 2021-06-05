import { config } from 'dotenv'
import { resolve } from 'path'

if (process.env.NODE_ENV === 'development') {
  config()
} else if (process.env.NODE_ENV === 'test') {
  config({ path: resolve(process.cwd(), '.env.test') })
}
