import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ServerClient {
  private _axios: AxiosInstance;

  constructor() {
    const { SERVER_API_URL = 'http://localhost:5000' } = process.env;

    this._axios = axios.create({
      baseURL: SERVER_API_URL,
      withCredentials: true,
    });
  }

  get(url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    return this._axios.get(url, options);
  }

  post(
    url: string,
    payload: any,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this._axios.post(url, payload, options);
  }
}

const client = new ServerClient();

export default client;
