import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  // if (to.fullPath === from.fullPath) { return true; }
  const authStore = useAuthStore();
  if (to.fullPath === '/login/signIn' && authStore.isFailed === true) {
    return true;
  }
  await authStore.checkAuth();
  if (to.fullPath.includes('/login')) {
    if (authStore.user !== null) {
      return '/';
    } else if (to.fullPath === '/login' || to.fullPath === '/login/') {
      return '/login/signIn';
    } else {
      return true;
    }
  }
  if (authStore.user === null) {
    return '/login/signIn';
  }
  return true;
});
