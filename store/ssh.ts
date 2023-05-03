import { defineStore } from 'pinia';
import {
  SshElementType
} from '~/interfaces';
import apiClient from '~/helpers/apiClient';

export const useSshStore = defineStore('sshStore', () => {
  const sshList = ref<SshElementType[]>([]);
  const fetchList = () => {
    return apiClient('/ssh', {
      method: 'GET'
    }, (list: SshElementType[]) => {
      sshList.value = list ?? [];
    });
  };

  return {
    fetchList,
    sshList
  };
});
