import { fetchTask } from '../fetch-task';
import { axiosInstance } from '@/lib/axios';
import { vi, describe, it, expect } from 'vitest';
import { handleApiError } from '@/features/tasks/utils';
import { Task } from '@/lib/types';

vi.mock('@/lib/axios');
vi.mock('@/features/tasks/utils');

describe('fetchTask', () => {
  const mockTask: Task = {
    id: '1',
    text: 'Test task',
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString(),
  };

  it('should fetch task successfully', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: mockTask });

    const result = await fetchTask({ id: '1' });

    expect(axiosInstance.get).toHaveBeenCalledWith('/tasks/1');
    expect(result).toEqual(mockTask);
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(axiosInstance.get).mockRejectedValue(error);

    await expect(fetchTask({ id: '1' })).rejects.toThrow(
      'Fetching task failed!'
    );
    expect(handleApiError).toHaveBeenCalledWith(error);
  });
});
