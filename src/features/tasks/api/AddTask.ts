import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { Task } from '../interface';
import { AddTaskSchema } from '../schema';
import { z } from 'zod';
import { useNotification } from '../../../hooks/useNotification';
import { AxiosError } from 'axios';

const addTask = async (
  newTask: z.infer<typeof AddTaskSchema>,
): Promise<Task> => {
  const response = await api.post('/tasks', newTask);
  return response.data;
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        showNotification('error', error.response.data.message);
      } else {
        showNotification('error', 'An unexpected error occurred');
      }
    },
  });
};
