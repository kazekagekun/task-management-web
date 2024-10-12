import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoot } from './routes/root';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/app',
      element: <AppRoot />,
      children: [
        {
          path: 'tasks',
          lazy: async () => {
            const { TasksRoute } = await import('./routes/tasks/tasks');
            return { Component: TasksRoute };
          },
          loader: async (args: LoaderFunctionArgs) => {
            const { tasksLoader } = await import('./routes/tasks/tasksLoader');
            return tasksLoader(queryClient)(args);
          },
        },
      ],
    },
    // {
    //   path: '*',
    //   lazy: async () => {
    //     const { NotFoundRoute } = await import('./routes/not-found');
    //     return { Component: NotFoundRoute };
    //   },
    // },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
