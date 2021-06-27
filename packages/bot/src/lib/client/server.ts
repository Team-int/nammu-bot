import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ServerClient {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.SERVER_BASE_URL,
    })
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config)
  }

  public post(url: string, payload?: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, payload, config)
  }

  public patch(url: string, payload?: any, config?: AxiosRequestConfig) {
    return this.axios.patch(url, payload, config)
  }
}

const client = new ServerClient()

export default client
