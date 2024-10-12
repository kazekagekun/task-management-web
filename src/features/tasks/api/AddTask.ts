import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { Task } from '../interface';
import { AddTaskSchema } from '../schema';
import { z } from 'zod';

const addTask = async (
  newTask: z.infer<typeof AddTaskSchema>,
): Promise<Task> => {
  const response = await api.post('/tasks', newTask);
  return response.data;
};

// Custom hook for adding a task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: (newTask) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks ? [...oldTasks, newTask] : [newTask];
      });
    },
  });
};
