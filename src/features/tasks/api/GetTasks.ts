import { queryOptions, useQuery } from '@tanstack/react-query';

import { Task } from '../types';
import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { AxiosResponse } from 'axios';

type TasksResponse = {
  status: boolean;
  data: {
    data: Task[];
    total: number;
    pageTotal: number;
  };
};

export const getTasks = (page = 1): Promise<AxiosResponse<TasksResponse>> => {
  return api.get(`/tasks`, {
    params: {
      page,
    },
  });
};

export const getTasksQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['tasks', { page }] : ['tasks'],
    queryFn: () => getTasks(page),
  });
};

type UseTasksOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

export const useTasks = ({ queryConfig, page }: UseTasksOptions) => {
  return useQuery({
    ...getTasksQueryOptions({ page }),
    ...queryConfig,
  });
};
