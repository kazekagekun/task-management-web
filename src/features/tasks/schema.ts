import { z } from 'zod';

export const AddTaskSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.date().min(new Date(), 'Due date must be in the future'),
});

export const UpdateTaskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.date().min(new Date(), 'Due date must be in the future'),
});

export type AddTaskFormValues = z.infer<typeof AddTaskSchema>;
export type UpdateTaskFormValues = z.infer<typeof UpdateTaskSchema>;
