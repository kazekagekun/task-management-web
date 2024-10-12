import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { Task } from '../interface';
import { AddTaskSchema } from '../schema';
import { z } from 'zod';

type UpdateTaskPayload = z.infer<typeof AddTaskSchema> & { id: string };

const updateTask = async (updatedTask: UpdateTaskPayload): Promise<Task> => {
  const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
  return response.data;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
