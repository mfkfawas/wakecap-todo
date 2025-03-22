import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode.toggle';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Children />
        <ModeToggle />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const Children = () => {
  return (
    <Button className="bg-red-500" onClick={() => {}}>
      Shadcn dark mode
    </Button>
  );
};

export default App;
