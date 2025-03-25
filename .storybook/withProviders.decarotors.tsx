import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageProvider } from '../src/context/pagination';
import { ThemeProvider } from '../src/components/theme-provider';

const queryClient = new QueryClient();

export const withProviders = (Story) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <PageProvider>
        <Story />
      </PageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
