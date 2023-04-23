import { EnvConfig } from '~/interfaces';

export const errRequestHandler = (err: any, config: EnvConfig): boolean|string => {
  if (!config.PRODUCTION) {
    console.error(err.message);
  }
  if (Object.prototype.hasOwnProperty.call(err, 'response') && err.response) {
    if ([400, 404].includes(err.response?.status)) {
      return err.message;
    }
  } else {
    return err.message;
  }
  return false;
};
export const errVueHandler = (res: any): boolean => {
  if (res === true) {
    return true;
  }
  if (res === -1) {
    const router = useRouter();
    router.push('/');
  } else if (res === 403) {
    // todo not rights
  } else {
    // todo unknown error;
  }
  return false;
};
