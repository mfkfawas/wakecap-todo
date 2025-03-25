import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskListItem } from '.';
import {
  useCompleteTask,
  useDeleteTask,
  useUpdateTask,
} from '@/features/tasks/hooks';
import userEvent from '@testing-library/user-event';

// Mock the hooks
vi.mock('@/features/tasks/hooks', () => ({
  useCompleteTask: vi.fn(() => ({
    completeTask: vi.fn(),
    isCompleting: false,
  })),
  useDeleteTask: vi.fn(() => ({
    deleteTask: vi.fn(),
    isDeleting: false,
  })),
  useUpdateTask: vi.fn(() => ({
    updateTask: vi.fn(),
    isUpdating: false,
  })),
}));

const mockUseCompleteTask = vi.mocked(useCompleteTask);
const mockUseDeleteTask = vi.mocked(useDeleteTask);
const mockUseUpdateTask = vi.mocked(useUpdateTask);

describe('TaskListItem', () => {
  const mockTask = {
    id: '1',
    text: 'Test task',
    completed: false,
    deleted: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task text and interactive elements', () => {
    render(<TaskListItem {...mockTask} />);

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('toggles task completion when checkbox is clicked', async () => {
    const mockComplete = vi.fn();
    mockUseCompleteTask.mockReturnValue({
      completeTask: mockComplete,
      isCompleting: false,
    });

    render(<TaskListItem {...mockTask} />);
    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(mockComplete).toHaveBeenCalledWith(
        { id: '1', text: 'Test task', completed: true },
        expect.anything()
      );
    });
  });

  it('opens update modal on double click', async () => {
    render(<TaskListItem {...mockTask} />);
    await userEvent.dblClick(screen.getByText('Test task'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('deletes task when trash icon is clicked', async () => {
    const mockDelete = vi.fn();
    mockUseDeleteTask.mockReturnValue({
      deleteTask: mockDelete,
      isDeleting: false,
    });

    render(<TaskListItem {...mockTask} />);
    fireEvent.click(screen.getByTestId('delete-icon'));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith({
        id: '1',
        text: 'Test task',
        deleted: true,
      });
    });
  });

  it('disables interactions for deleted tasks', () => {
    render(<TaskListItem {...mockTask} deleted={true} />);

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByTestId('ban-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('delete-icon')).not.toBeInTheDocument();

    // Verify double click doesn't open modal
    fireEvent.dblClick(screen.getByText('Test task'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('updates task text when modal is submitted', async () => {
    const mockUpdate = vi.fn();
    mockUseUpdateTask.mockReturnValue({
      updateTask: mockUpdate,
      isUpdating: false,
    });

    render(<TaskListItem {...mockTask} />);
    await userEvent.dblClick(screen.getByText('Test task'));

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated task');
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        {
          id: '1',
          text: 'Updated task',
          completed: false,
        },
        expect.anything()
      );
    });
  });
});
