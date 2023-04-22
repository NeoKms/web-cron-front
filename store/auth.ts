import { defineStore } from 'pinia';
import { ResultWithMessage } from '~/interfaces';
import axiosClient from '~/helpers/axios';
import { errRequestHandler } from '~/helpers/errorResponser';
import { useEnvStore } from '~/store/env';
import { LoginDto } from '~/interfaces/apiTypes/auth/dto/login.dto';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';

export const useAuthStore = defineStore('authStore', () => {
  const envStore = useEnvStore();
  const user = ref<ResponseUserDto|null>(null);
  const isFailed = ref(false);
  const checkAuth = (): Promise<boolean|string> => {
    console.log('in check');
    return axiosClient.get(`${envStore.env.API_HOST}/auth/checkLogin`)
      .then((resp) => {
        const respdata: ResultWithMessage<ResponseUserDto> = resp.data;
        if (respdata.message === 'ok') {
          user.value = respdata.result;
          isFailed.value = false;
          return true;
        } else {
          user.value = null;
          isFailed.value = true;
          return respdata.error || respdata.message;
        }
      })
      .catch((err) => {
        user.value = null;
        isFailed.value = true;
        return errRequestHandler(err);
      });
  };
  const login = (payload: LoginDto) => {
    return axiosClient.post(`${envStore.env.API_HOST}/auth/login`, payload)
      .then((resp) => {
        const respdata: ResultWithMessage<ResponseUserDto> = resp.data;
        if (respdata.message === 'ok') {
          user.value = respdata.result;
          const cookie = resp.headers;
          console.log(cookie);
          // setCookie();
          return true;
        } else {
          return respdata.error || respdata.message;
        }
      })
      .catch(err => errRequestHandler(err));
  };
  return { checkAuth, user, login, isFailed };
});
