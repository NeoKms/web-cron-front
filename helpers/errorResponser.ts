import { EnvConfig } from '~/interfaces';
import { useNotificationStore } from '~/store/notification';

export const errRequestHandler = (err: any, config: EnvConfig): boolean | string => {
  if (!config.PRODUCTION) {
    console.error(err.message);
  }
  if (Object.prototype.hasOwnProperty.call(err, 'response') && err.response) {
    if ([400, 404, 401, 403, 500].includes(err.response?.status)) {
      return err.response._data.message;
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
  const notifStore = useNotificationStore();
  if (res === -1) {
    const router = useRouter();
    router.push('/');
  } else if (res === 403) {
    notifStore.sendNotif({
      message: 'Недостаточно прав для действия',
      duration: 3000,
      type: 'warning',
      position: 'top'
    });
  } else {
    notifStore.sendNotif({
      message: res,
      duration: 3000,
      type: 'error',
      position: 'bottom-right'
    });
  }
  return false;
};
