import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  LoaderFunctionArgs,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoot } from './routes/root';
import { ProtectedRoute } from './routes/ProtectedRoute';

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
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
    {
      path: '/',
      element: <Navigate to="/app" replace />,
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/NotFound/notFound');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
