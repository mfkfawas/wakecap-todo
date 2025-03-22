import { axiosInstance } from '@/lib/axios';
import { Task } from '@/lib/types';
import { handleApiError } from '@/features/tasks/utils';

type FetchTaskParams = {
  id: string;
};

export const fetchTask = async ({
  id,
}: FetchTaskParams): Promise<Task | undefined> => {
  try {
    const res = await axiosInstance.get(`/tasks/${id}`);
    return res.data;
  } catch (err: unknown) {
    handleApiError(err);
  }
};
