const { env } = process

interface Config {
    API_HOST: string;
    PRODUCTION: boolean;
}
export default {
  PRODUCTION: false,
  API_HOST: env.API_HOST
} as Config
