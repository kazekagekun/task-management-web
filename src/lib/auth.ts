import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from './api-client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
}

export const useLogin = (
  options?: UseLoginOptions,
): UseMutationResult<
  AxiosResponse<LoginResponse>,
  AxiosError,
  LoginCredentials,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post('/auth/login', credentials),
    onSuccess: (response) => {
      const data = response.data;
      setTokens(data.accessToken, data.refreshToken);
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Call the custom onSuccess callback if provided
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};

export const useLogout = (): UseMutationResult<
  AxiosResponse<void>,
  AxiosError,
  void,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      clearTokens();
      delete api.defaults.headers.common['Authorization'];
      queryClient.setQueryData(['user'], null);
    },
  });
};

export const useUser = () => {
  const queryOptions: UseQueryOptions<User, AxiosError> = {
    queryKey: ['user'],
    queryFn: () => api.get<User>('/auth/user').then((res) => res.data),
    enabled: !!getAccessToken(),
    retry: false,
  };

  const query = useQuery(queryOptions);

  if (query.isError) {
    clearTokens();
  }

  return query;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
