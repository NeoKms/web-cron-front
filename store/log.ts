import { defineStore } from 'pinia';
import {
  LogElementType
} from '~/interfaces';
import apiClient from '~/helpers/apiClient';
import PaginateDto from '~/interfaces/apiTypes/helpers/paginate.dto';
import { ContentDto } from '~/interfaces/apiTypes/log/dto/content.dto';

export const useLogStore = defineStore('logStore', () => {
  const logList = ref<LogElementType[]>([]);
  const logPagination = ref<PaginateDto>({
    all: 0,
    itemsPerPage: 10,
    page: 1
  });
  const fetchList = () => {
    return apiClient<{data: LogElementType[], pagination: PaginateDto}>('/log', {
      method: 'POST',
      body: {
        select: [],
        options: {
          itemsPerPage: 30,
          page: 1
        }
      }
    }, ({ data, pagination }) => {
      logList.value = data ?? [];
      logPagination.value = pagination;
    });
  };

  const fetchById = (id: number) => {
    const {} = logList.value.find(e => e.id === id);
    return apiClient<ContentDto>('/logs/' + id);
  };
  return {
    fetchList,
    logList
  };
});
