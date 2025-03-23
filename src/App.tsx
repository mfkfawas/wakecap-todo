import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageProvider } from '@/context/pagination';
import { AppLayout } from '@/layout';
import { THEME } from '@/lib/utils';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme={THEME.DEFAULT}
        storageKey={THEME.LOCALSTORAGE_KEY}
      >
        <PageProvider>
          <AppLayout />
        </PageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
