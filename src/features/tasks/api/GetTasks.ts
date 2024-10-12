import { queryOptions, useQuery } from '@tanstack/react-query';

import { Task } from '../interface';
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

export const getTasks = (
  page = 1,
  sort = 'createdAt',
  order = 'desc',
): Promise<AxiosResponse<TasksResponse>> => {
  return api.get(`/tasks`, {
    params: {
      page,
      sort,
      order,
    },
  });
};

export const getTasksQueryOptions = ({
  page,
  sort,
  order,
}: { page?: number; sort?: string; order?: string } = {}) => {
  return queryOptions({
    queryKey: page ? ['tasks', { page }] : ['tasks'],
    queryFn: () => getTasks(page, sort, order),
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
