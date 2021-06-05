import 'pg'
import { createConnection, ConnectionOptions } from 'typeorm'

export class Database {
  private connectionOptions: ConnectionOptions

  constructor() {
    this.initialOptions()
  }

  private initialOptions() {
    this.connectionOptions = {
      type: process.env.TYPEORM_TYPE as any,
      host: process.env.TYPEORM_HOST,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
      dropSchema: process.env.TYPEORM_DROPSCHEMA === 'true',
      synchronize: process.env.TYPEORM_SYNCRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    }
  }

  public async connect(connectionOptions?: ConnectionOptions) {
    return createConnection(connectionOptions || this.connectionOptions)
  }
}
