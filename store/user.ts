import { defineStore } from 'pinia';
import { CreateUserType, UserListElementType } from '~/interfaces';
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
  const create = (payload: CreateUserType) => {
    return apiClient<void>('/user',
      {
        method: 'POST',
        body: payload
      });
  };
  const update = (payload: CreateUserType) => {
    return apiClient<void>('/user/' + payload.id,
      {
        method: 'PATCH',
        body: payload
      });
  };
  return { fetchList, userList, create, update };
});
