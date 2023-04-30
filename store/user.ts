import { defineStore } from 'pinia';
import { CreateUserType, UpdateUserType, UserByIdType, UserListElementType } from '~/interfaces';
import apiClient from '~/helpers/apiClient';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';

export const useUserStore = defineStore('userStore', () => {
  const userList = ref<UserListElementType[]>([]);
  const userById = ref<UserByIdType|null>(null);
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
  const update = (id: number, payload: UpdateUserType) => {
    return apiClient<void>(`/user/${id}`,
      {
        method: 'PATCH',
        body: payload
      });
  };
  const unban = (id: number) => {
    return apiClient<void>(`/user/${id}/unban`, {
      method: 'GET'
    }, () => {
      const user = userList.value.find(u => u.id === id);
      if (user) {
        user.banned_to = 0;
      }
    });
  };
  const activate = (id: number) => {
    return apiClient<void>(`/user/${id}/activate`, {
      method: 'GET'
    }, () => {
      const user = userList.value.find(u => u.id === id);
      if (user) {
        user.isActive = true;
      }
    });
  };
  const deactivate = (id: number) => {
    return apiClient<void>(`/user/${id}`, {
      method: 'DELETE'
    }, () => {
      const user = userList.value.find(u => u.id === id);
      if (user) {
        user.isActive = false;
      }
    });
  };
  const fetchById = (id: number) => {
    return apiClient<ResponseUserDto>(`/user/${id}`,
      { method: 'GET' },
      (user) => {
        userById.value = user;
      });
  };
  return { fetchList, userList, create, update, unban, activate, deactivate, fetchById, userById };
});
