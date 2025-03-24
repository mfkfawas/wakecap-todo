// src/features/tasks/services/update-task.test.ts
import { updateTask } from '../update-task';
import { axiosInstance } from '@/lib/axios';
import { vi, describe, it, expect } from 'vitest';
import { handleApiError } from '@/features/tasks/utils';
import { Task } from '@/lib/types';

vi.mock('@/lib/axios');
vi.mock('@/features/tasks/utils');

describe('updateTask', () => {
  const mockTask: Task = {
    id: '1',
    text: 'Updated task',
    completed: true,
    deleted: false,
    createdAt: new Date().toISOString(),
  };

  const updateParams = {
    id: '1',
    text: 'Updated task',
    completed: true,
  };

  it('should update task with correct payload', async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: mockTask });

    const result = await updateTask(updateParams);

    expect(axiosInstance.put).toHaveBeenCalledWith('/tasks/1', {
      text: 'Updated task',
      completed: true,
      deleted: false,
      createdAt: expect.any(String),
    });
    expect(result).toEqual(mockTask);
  });

  it('should use default values for optional params', async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: mockTask });

    await updateTask({ id: '1', text: 'Updated task' });

    expect(axiosInstance.put).toHaveBeenCalledWith('/tasks/1', {
      text: 'Updated task',
      completed: false,
      deleted: false,
      createdAt: expect.any(String),
    });
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    vi.mocked(axiosInstance.put).mockRejectedValue(error);

    await expect(updateTask(updateParams)).rejects.toThrow(
      'Task updation failed!'
    );
    expect(handleApiError).toHaveBeenCalledWith(error);
  });
});
