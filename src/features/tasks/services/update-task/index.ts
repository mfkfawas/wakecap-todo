import { axiosInstance } from '@/lib/axios';
import { Task } from '@/lib/types';
import { handleApiError } from '@/features/tasks/utils';

export type UpdateTaskParams = {
  id: string;
  text: string;
  completed?: boolean;
  deleted?: boolean;
};

export const updateTask = async ({
  id,
  text,
  completed = false,
  deleted = false,
}: UpdateTaskParams): Promise<Task> => {
  try {
    const res = await axiosInstance.put(`/tasks/${id}`, {
      text,
      completed,
      deleted,
      createdAt: new Date().toISOString(),
    });
    return res.data;
  } catch (err: unknown) {
    handleApiError(err);
    throw new Error('Task updation failed!');
  }
};
