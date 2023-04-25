import { defineStore } from 'pinia';
import { ActiveToast, ToastPropsWithMessage, useToast } from 'vue-toast-notification';

export const useNotificationStore = defineStore('notificationStore', () => {
  const sendNotif = (config: ToastPropsWithMessage): ActiveToast => {
    if (!process.server) {
      const $toast = useToast();
      return $toast.open(config);
    } else {
      console.log(config.type, config.message);
      return {
        dismiss: () => {}
      };
    }
  };
  return { sendNotif };
});
