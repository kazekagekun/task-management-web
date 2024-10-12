import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MainErrorFallback } from '../components/errors/main';
import {
  createTheme,
  Loader,
  MantineColorsTuple,
  MantineProvider,
} from '@mantine/core';
import { queryConfig } from '../lib/react-query';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

type AppProviderProps = {
  children: React.ReactNode;
};

const myColor: MantineColorsTuple = [
  '#e6ffee',
  '#d3f9e0',
  '#a8f2c0',
  '#7aea9f',
  '#54e382',
  '#3bdf70',
  '#2bdd66',
  '#1bc455',
  '#0bae4a',
  '#00973c',
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <MantineProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            {import.meta.env.DEV && <ReactQueryDevtools />}
            {children}
          </QueryClientProvider>
        </MantineProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
