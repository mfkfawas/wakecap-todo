import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageProvider } from '@/context/pagination';
import { AppLayout } from '@/layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PageProvider>
          <AppLayout />
        </PageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
