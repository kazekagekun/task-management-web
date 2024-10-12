import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api-client';
import { Task } from '../interface';
import { AddTaskSchema } from '../schema';
import { z } from 'zod';

// Define a type for the update task payload
type UpdateTaskPayload = z.infer<typeof AddTaskSchema> & { id: string };

// Function to update a task
const updateTask = async (updatedTask: UpdateTaskPayload): Promise<Task> => {
  const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
  return response.data;
};

// Custom hook for updating a task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      // Optionally, you can update the cache directly
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        if (!oldTasks) return [updatedTask];
        return oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        );
      });
    },
  });
};
