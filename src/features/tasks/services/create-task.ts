import { axiosInstance } from '@/lib/axios';
import { Task } from '@/lib/types';
import { handleApiError } from '@/features/tasks/utils';

export type CreateTaskParams = {
  text: string;
};

export const createTask = async ({ text }: CreateTaskParams): Promise<Task> => {
  try {
    const res = await axiosInstance.post(`/tasks`, {
      text,
      createdAt: new Date().toISOString(),
      completed: false,
      deleted: false,
    });
    return res.data;
  } catch (err: unknown) {
    handleApiError(err);
    throw new Error('Task creation failed!');
  }
};
