declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT?: string
      TYPEORM_TYPE: string
      TYPEORM_HOST: string
      TYPEORM_DATABASE: string
      TYPEORM_USERNAME: string
      TYPEORM_PASSWORD: string
      TYPEORM_PORT: string
      TYPEORM_DROPSCHEMA: string
      TYPEORM_SYNCRONIZE: string
      TYPEORM_LOGGING: string
      DISCORD_APP_ID: string
      DISCORD_REDIRECT_URL: string
      DISCORD_APP_SECRET: string
      COOKIE_SECRET: string
    }
  }
}
