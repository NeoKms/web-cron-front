import { defineStore } from 'pinia';
import { LoginDto } from '~/interfaces/apiTypes/auth/dto/login.dto';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';
import apiClient from '~/helpers/apiClient';
import { useEnvStore } from '~/store/env';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<ResponseUserDto|null>(null);
  const isFailed = ref(false);
  const checkAuth = (): Promise<boolean|string> => {
    return apiClient<ResponseUserDto>('/auth/checkLogin', {
      method: 'GET'
    },
    (result) => {
      user.value = result;
      isFailed.value = false;
    },
    () => {
      user.value = null;
      isFailed.value = true;
    }
    );
  };
  const login = (payload: LoginDto) => {
    return apiClient<ResponseUserDto>('/auth/login', {
      body: payload,
      method: 'POST'
    },
    (result) => {
      const envStore = useEnvStore();
      user.value = result;
      const auth = document.cookie.split(';').find(e => e.includes(envStore.env.AUTH_COOKIE_NAME));
      if (auth) {
        const splitted = auth.split('=');
        const authc = useCookie(envStore.env.AUTH_COOKIE_NAME, {
          maxAge: 0
        });
        authc.value = splitted[1];
      }
    });
  };
  return { checkAuth, user, login, isFailed };
});
