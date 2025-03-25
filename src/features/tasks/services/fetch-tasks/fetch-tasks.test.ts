// src/features/tasks/services/fetch-tasks.test.ts
import { fetchTasks } from '.';
import { axiosInstance } from '@/lib/axios';
import { vi, describe, it, expect } from 'vitest';
import { handleApiError } from '@/features/tasks/utils';

vi.mock('@/lib/axios');
vi.mock('@/features/tasks/utils');

describe('fetchTasks', () => {
  const mockPaginatedResponse = {
    first: 1,
    prev: null,
    next: 2,
    last: 3,
    pages: 3,
    items: 25,
    data: [
      {
        id: '1',
        text: 'Task 1',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const mockNonPaginatedResponse = [
    {
      id: '1',
      text: 'Task 1',
      completed: false,
      deleted: false,
      createdAt: new Date().toISOString(),
    },
  ];

  it('should fetch paginated tasks with correct URL', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockPaginatedResponse,
    });

    const result = await fetchTasks({ page: 1 });

    expect(axiosInstance.get).toHaveBeenCalledWith(
      '/tasks?_page=1&_per_page=10&_sort=-createdAt'
    );
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should fetch non-paginated tasks with correct URL', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockNonPaginatedResponse,
    });

    const result = await fetchTasks({ noPagination: true });

    expect(axiosInstance.get).toHaveBeenCalledWith('/tasks');
    expect(result).toEqual(mockNonPaginatedResponse);
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(axiosInstance.get).mockRejectedValue(error);

    await expect(fetchTasks({ page: 1 })).rejects.toThrow(
      'Fetching tasks failed!'
    );
    expect(handleApiError).toHaveBeenCalledWith(error);
  });
});
