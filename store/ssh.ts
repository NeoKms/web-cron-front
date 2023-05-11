import { defineStore } from 'pinia';
import {
  CreateSshType,
  SshElementType
} from '~/interfaces';
import apiClient from '~/helpers/apiClient';

export const useSshStore = defineStore('sshStore', () => {
  const sshList = ref<SshElementType[]>([]);
  const fetchList = () => {
    return apiClient<SshElementType[]>('/ssh', {
      method: 'GET'
    }, (list) => {
      sshList.value = list ?? [];
    });
  };
  const create = (payload: CreateSshType) => {
    const fd = new FormData();
    fd.append('host', payload.host);
    if (payload.port) {
      fd.append('port', payload?.port.toString());
    }
    fd.append('username', payload.username);
    if (payload.description) {
      fd.append('description', payload.description);
    }
    if (payload.privateKey) {
      fd.append('privateKey', payload.privateKey);
    }
    return apiClient<void>('/ssh', {
      method: 'POST',
      body: fd
    });
  };

  return {
    fetchList,
    sshList,
    create
  };
});
