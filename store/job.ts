import { defineStore } from 'pinia';
import {
  CreateJobType,
  JobElementType
} from '~/interfaces';
import apiClient from '~/helpers/apiClient';

export const useJobStore = defineStore('jobStore', () => {
  const jobList = ref<JobElementType[]>([]);
  const fetchList = () => {
    return apiClient<JobElementType[]>('/jobs/list', {
      method: 'POST',
      body: {
        select: ['job', 'id', 'time', 'sshEntityId', 'isActive'],
        options: {
          itemsPerPage: 100,
          page: 1
        }
      }
    }, (list) => {
      jobList.value = list ?? [];
    });
  };
  const create = (payload: CreateJobType) => {
    return apiClient<void>('/jobs', {
      method: 'POST',
      body: payload
    });
  };

  return {
    fetchList,
    jobList,
    create
  };
});
