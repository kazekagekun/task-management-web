import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoot } from './routes/root';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/app',
      element: <AppRoot />,
      children: [
        // {
        //   path: 'discussions',
        //   lazy: async () => {
        //     const { DiscussionsRoute } = await import(
        //       './routes/app/discussions/discussions'
        //     );
        //     return { Component: DiscussionsRoute };
        //   },
        //   loader: async (args: LoaderFunctionArgs) => {
        //     const { discussionsLoader } = await import(
        //       './routes/app/discussions/discussions'
        //     );
        //     return discussionsLoader(queryClient)(args);
        //   },
        // },
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
