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
  name?: string,
  description?: string,
): Promise<AxiosResponse<TasksResponse>> => {
  return api.get(`/tasks`, {
    params: {
      page,
      sort,
      order,
      name,
      description,
    },
  });
};

export const getTasksQueryOptions = ({
  page,
  sort,
  order,
  name,
  description,
}: {
  page?: number;
  sort?: string;
  order?: string;
  name?: string;
  description?: string;
} = {}) => {
  return queryOptions({
    queryKey: page ? ['tasks', { page }] : ['tasks'],
    queryFn: () => getTasks(page, sort, order, name, description),
  });
};

type UseTasksOptions = {
  sort?: string;
  order?: string;
  page?: number;
  name?: string;
  description?: string;
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

export const useTasks = ({
  queryConfig,
  page,
  sort,
  order,
  name,
  description,
}: UseTasksOptions) => {
  return useQuery({
    ...getTasksQueryOptions({ page, sort, order, name, description }),
    ...queryConfig,
  });
};
