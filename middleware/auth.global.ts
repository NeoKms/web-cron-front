import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  if (to.fullPath.includes('/login')) {
    if (authStore.user !== null) {
      return '/'
    } else if (to.fullPath === '/login' || to.fullPath === '/login/') {
      return '/login/signIn'
    } else {
      return true
    }
  }
  await authStore.checkAuth()
  if (authStore.user === null) {
    return '/login/signIn'
  }
  return true
})
