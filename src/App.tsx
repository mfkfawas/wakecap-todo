import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode.toggle';
import axios from 'axios';

const fetchUsers = async () => {
  const res = await axios.post('http://localhost:4002/tasks', {
    text: 'jiberlekka a book',
    completed: true,
    deleted: false,
    createdAt: '2025-02-03T14:00:00Z',
  });
  console.log('🚀 ~ fetchUsers ~ res:', res);
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Button onClick={fetchUsers} className="bg-red-500">
        Shadcn dark mode
      </Button>
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
