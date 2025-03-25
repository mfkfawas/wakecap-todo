import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TasksList } from '.';
import { Task } from '@/lib/types';

// Mock the TaskListItem to avoid testing its internals
vi.mock('./TaskListItem', () => ({
  TaskListItem: vi.fn(({ text }) => <li>{text}</li>),
}));

describe('TasksList', () => {
  const queryClient = new QueryClient();
  const mockTasks: Task[] = [
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
    {
      id: '3',
      text: 'Task 3',
      completed: false,
      deleted: true,
      createdAt: '2025-03-23T21:22:47.104Z',
    },
  ];

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('renders all tasks in the list', () => {
    render(<TasksList tasks={mockTasks} />, { wrapper: Wrapper });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    render(<TasksList tasks={mockTasks} />, { wrapper: Wrapper });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockTasks.length);
  });

  it('passes correct props to each TaskListItem', () => {
    render(<TasksList tasks={mockTasks} />, { wrapper: Wrapper });

    mockTasks.forEach((task) => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  it('renders empty state when no tasks provided', () => {
    render(<TasksList tasks={[]} />, { wrapper: Wrapper });

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
