import { axiosInstance } from '@/lib/axios';
import { Task } from '@/lib/types';
import { handleApiError } from '@/features/tasks/utils';

type FetchTasksParams = {
  page?: number;
  noPagination?: boolean;
};

export type FetchTasksResponse = {
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
  noPagination,
}: FetchTasksParams): Promise<FetchTasksResponse | Task[]> => {
  try {
    const res = await axiosInstance.get(
      `${noPagination ? '/tasks' : `/tasks?_page=${page}&_per_page=10&_sort=-createdAt`}`
    );
    return res.data;
  } catch (err: unknown) {
    handleApiError(err);
    throw new Error('Fetching tasks failed!');
  }
};
