import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  if (to.fullPath === '/login/signIn' && authStore.isFailed === true) {
    return true;
  }
  const config = useRuntimeConfig().public;
  !config.PRODUCTION && console.info('middleware', from.fullPath, '=>', to.fullPath);
  await authStore.checkAuth();
  if (to.fullPath.includes('/login')) {
    if (authStore.user !== null) {
      return navigateTo('/');
    } else if (to.fullPath === '/login' || to.fullPath === '/login/') {
      return navigateTo('/login/signIn');
    }
  } else if (authStore.user === null) {
    return navigateTo('/login/signIn');
  }
});
