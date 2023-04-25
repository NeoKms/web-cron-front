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

export interface UserNavigationItem {
  name: string;
  href?: string;
  action?: () => any;
}

export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: string;
  skip?: boolean;
}
