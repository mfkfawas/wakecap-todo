import { axiosInstance } from '@/lib/axios';
import { Task } from '@/lib/types';
import { handleApiError } from '@/features/tasks/utils';

type FetchTasksParams = {
  page: number;
};

type FetchTasksResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Task[];
};

export const fetchTasks = async ({
  page,
}: FetchTasksParams): Promise<FetchTasksResponse | undefined> => {
  try {
    const res = await axiosInstance.get(`/tasks?_page=${page}&_per_page=10`);
    return res.data;
  } catch (err: unknown) {
    handleApiError(err);
  }
};
