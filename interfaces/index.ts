export interface ResultWithMessage<T> {
    message: string;
    result: T;
    error?: string;
}

export interface EnvConfig {
    API_HOST: string;
    PRODUCTION: boolean;
    AUTH_COOKIE_NAME: string;
}
