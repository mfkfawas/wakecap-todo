import { createTask } from '../create-task';
import { axiosInstance } from '@/lib/axios';
import { vi, describe, it, expect } from 'vitest';
import { handleApiError } from '@/features/tasks/utils';

vi.mock('@/lib/axios');
vi.mock('@/features/tasks/utils');

describe('createTask', () => {
  it('should create task with correct payload', async () => {
    const mockTask = { id: '1', text: 'Test', completed: false };
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: mockTask });

    const result = await createTask({ text: 'Test' });

    expect(axiosInstance.post).toHaveBeenCalledWith('/tasks', {
      text: 'Test',
      completed: false,
      deleted: false,
      createdAt: expect.any(String),
    });
    expect(result).toEqual(mockTask);
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(axiosInstance.post).mockRejectedValue(error);

    await expect(createTask({ text: 'Test' })).rejects.toThrow(
      'Task creation failed!'
    );
    expect(handleApiError).toHaveBeenCalledWith(error);
  });
});
