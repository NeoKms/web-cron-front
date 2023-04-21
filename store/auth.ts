import { defineStore } from 'pinia'
import { AuthUserInterface, ResultWithMessage } from '~/interfaces'
import axiosClient from '~/helpers/axios'
import config from '~/config/config'
import { errRequestHandler } from '~/helpers/errorResponser'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<AuthUserInterface|null>(null)
  const checkAuth = (): Promise<boolean|string> => {
    return axiosClient.get(`${config.API_HOST}/auth/checkLogin`)
      .then((resp) => {
        const respdata: ResultWithMessage<AuthUserInterface> = resp.data
        if (respdata.message === 'ok') {
          user.value = respdata.result
          return true
        } else {
          return respdata.error || respdata.message
        }
      })
      .catch(err => errRequestHandler(err))
  }
  return { checkAuth, user }
})
