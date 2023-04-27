import { defineStore } from 'pinia';
import { UserListElementType } from '~/interfaces';
import apiClient from '~/helpers/apiClient';

export const useUserStore = defineStore('userStore', () => {
  const userList = ref<UserListElementType[]>([]);
  const fetchList = (payload: any = {}) => {
    return apiClient('/user/list', {
      method: 'POST',
      body: payload
    }, (list: UserListElementType[]) => {
      userList.value = list ?? [];
    });
  };
  return { fetchList, userList };
});
