import express from 'express'

export class Server {
  private express: express.Application

  constructor() {
    this.express = express()
  }

  public listen(port?: number) {
    const { PORT = port } = process.env

    if (!PORT) throw new Error('PORT not found')

    this.express.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  }

  get app() {
    return this.express
  }
}
