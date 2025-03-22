import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode.toggle';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { axiosInstance } from '@/lib/utils';

const queryClient = new QueryClient();

const fetchTasks = async () => {
  const res = await axiosInstance.get('/tasks');
  return res.data;
};

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
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
  console.log('🚀 ~ Children ~ data:', data);

  return <Button className="bg-red-500">Shadcn dark mode</Button>;
};

export default App;
