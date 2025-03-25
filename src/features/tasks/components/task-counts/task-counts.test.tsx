import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TasksCounts } from '.';
import { useFetchTasksWithNoPagination } from '@/features/tasks/hooks';

vi.mock('@/features/tasks/hooks', () => ({
  useFetchTasksWithNoPagination: vi.fn(),
}));

const mockUseFetchTasks = vi.mocked(useFetchTasksWithNoPagination);

describe('TasksCounts', () => {
  beforeEach(() => {
    mockUseFetchTasks.mockReturnValue({
      countOfCompletedTasks: 0,
      countOfDeletedTasks: 0,
      countOfTotalTasks: 0,
      isTasksLoading: false,
      tasksError: null,
    });
  });

  it('renders count badges for all task types', async () => {
    // Arrange
    mockUseFetchTasks.mockReturnValue({
      countOfCompletedTasks: 3,
      countOfDeletedTasks: 1,
      countOfTotalTasks: 5,
      isTasksLoading: false,
      tasksError: null,
    });

    // Act
    render(<TasksCounts />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
