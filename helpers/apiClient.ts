import { NitroFetchOptions } from 'nitropack';
import { ResultWithMessage } from '~/interfaces';
import { errRequestHandler } from '~/helpers/errorResponser';
import { useEnvStore } from '~/store/env';

export default <T>(uri: string, options: NitroFetchOptions<any>, onSuccess: (v: T) => void, onFail?: () => void) => {
  const envStore = useEnvStore();
  const authc = useCookie(envStore.env.AUTH_COOKIE_NAME);
  if (authc.value) {
    !options?.headers && (options.headers = {});
    // @ts-ignore
    options.headers.cookie = envStore.env.AUTH_COOKIE_NAME + '=' + authc.value;
  }
  return $fetch<unknown>(`${envStore.env.API_HOST}${uri}`,
    Object.assign(options, {
      credentials: 'include'
    }))
    .then((resp) => {
      const respdata = resp as ResultWithMessage<T>;
      if (respdata.message === 'ok') {
        onSuccess(respdata.result);
        return true;
      } else {
        !!onFail && onFail();
        return respdata.error || respdata.message;
      }
    })
    .catch((err) => {
      !!onFail && onFail();
      return errRequestHandler(err);
    });
};
