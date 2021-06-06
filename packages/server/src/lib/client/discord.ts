import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

interface RequestParamType {
  url: string
  payload?: any
  options?: AxiosRequestConfig
}

class DiscordAxios {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({ baseURL: 'http://discord.com/api' })
  }

  request(type: RequestType, options: RequestParamType) {
    const { url, payload, options: option } = options

    switch (type) {
      case 'GET':
        return this.axios.get(url, option)
      case 'POST':
        return this.axios.post(url, payload, option)
      case 'PATCH':
        return this.axios.patch(url, payload, option)
      case 'DELETE':
        return this.axios.delete(url, option)
      case 'PUT':
        return this.axios.put(url, payload, option)
    }
  }
}

const daxios = new DiscordAxios()

export default daxios
