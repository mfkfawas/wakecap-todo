import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tasks } from '.';
import { useFetchTasks } from '@/features/tasks/hooks';
import { usePage } from '@/context/pagination';

// Mock dependencies
vi.mock('@/features/tasks/hooks', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useFetchTasks: vi.fn(),
    useCompleteTask: vi.fn(() => ({
      isCompleting: false,
      completeTask: vi.fn(),
    })),
    useDeleteTask: vi.fn(() => ({
      isDeleting: false,
      deleteTask: vi.fn(),
    })),
    useUpdateTask: vi.fn(() => ({
      isUpdating: false,
      updateTask: vi.fn(),
    })),
  };
});
vi.mock('@/context/pagination', () => ({
  usePage: vi.fn(() => ({
    page: 1,
    setPage: vi.fn(),
  })),
}));

vi.mock('../no-tasks-placeholder', () => ({
  NoTasksPlaceHolder: () => <div>No tasks placeholder</div>,
}));

vi.mock('../tasks-list', () => ({
  TasksList: ({ tasks }: { tasks: any[] }) => (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  ),
}));

const mockUseFetchTasks = vi.mocked(useFetchTasks);
const mockUsePage = vi.mocked(usePage);

describe('Tasks', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders NoTasksPlaceHolder when there are no tasks', () => {
    mockUseFetchTasks.mockReturnValue({
      isTasksLoading: false,
      tasksError: null,
      tasks: [],
      countOfTotalTasks: 0,
      countOfDeletedTasks: 0,
      countOfCompletedTasks: 0,
      pages: 1,
    });
    render(<Tasks />, { wrapper: Wrapper });

    expect(
      screen.getByText('Sorry, you have no todos, Please add new todo.')
    ).toBeInTheDocument();
  });

  it('renders TasksList when tasks exist', () => {
    mockUseFetchTasks.mockReturnValue({
      tasks: [
        {
          id: '1',
          text: 'Task 1',
          completed: false,
          deleted: false,
          createdAt: '2025-03-23T21:22:47.104Z',
        },
        {
          id: '2',
          text: 'Task 2',
          completed: true,
          deleted: false,
          createdAt: '2025-03-23T21:22:47.104Z',
        },
      ],
      isTasksLoading: false,
      tasksError: null,
      countOfTotalTasks: 2,
      countOfDeletedTasks: 0,
      countOfCompletedTasks: 1,
      pages: 1,
    });
    render(<Tasks />, { wrapper: Wrapper });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('displays current page number', () => {
    mockUseFetchTasks.mockReturnValue({
      tasks: [
        {
          id: '1',
          text: 'Task 1',
          completed: false,
          deleted: false,
          createdAt: '2025-03-23T21:22:47.104Z',
        },
        {
          id: '2',
          text: 'Task 2',
          completed: true,
          deleted: false,
          createdAt: '2025-03-23T21:22:47.104Z',
        },
      ],
      isTasksLoading: false,
      tasksError: null,
      countOfTotalTasks: 2,
      countOfDeletedTasks: 0,
      countOfCompletedTasks: 1,
      pages: 1,
    });
    mockUsePage.mockReturnValue({ page: 3, setPage: vi.fn() });
    render(<Tasks />, { wrapper: Wrapper });

    expect(screen.getByText('Page:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
