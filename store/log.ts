import { defineStore } from 'pinia';
import {
  LogElementType
} from '~/interfaces';
import apiClient from '~/helpers/apiClient';
import PaginateDto from '~/interfaces/apiTypes/helpers/paginate.dto';
import { ContentDto } from '~/interfaces/apiTypes/log/dto/content.dto';
import { SimpleObject } from '~/interfaces/apiTypes/helpers/interfaces/common';
import ResponseLogFullDto from '~/interfaces/apiTypes/log/dto/response-log-full.dto';

export const useLogStore = defineStore('logStore', () => {
  const logList = ref<LogElementType[]>([]);
  const contentByKey = ref<SimpleObject<ContentDto>>({});
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

  const fetchContent = ({ ts, jobId, sshId }: {ts:number, jobId:number, sshId:number}) => {
    return apiClient<ResponseLogFullDto>(`/log/${sshId}/${jobId}/${ts}`, {
      method: 'GET'
    }, (data) => {
      contentByKey.value[`${sshId}_${jobId}_${ts}`] = data.content;
    });
  };
  return {
    fetchList,
    logList,
    fetchContent,
    contentByKey
  };
});
