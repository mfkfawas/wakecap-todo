import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks, type FetchTasksResponse } from '@/features/tasks/services';
import { usePage } from '@/context/pagination';

export function useFetchTasks() {
  const { page } = usePage();

  const { isLoading, data, error } = useQuery({
    queryKey: ['tasks', { page }],
    queryFn: () => fetchTasks({ page }),
  });

  const countOfDeletedTasks = useMemo(
    () =>
      (data as FetchTasksResponse)?.data.reduce((acc, curr) => {
        return acc + (curr.deleted ? 1 : 0);
      }, 0) ?? 0,
    [data]
  );

  const countOfCompletedTasks = useMemo(
    () =>
      (data as FetchTasksResponse)?.data.reduce((acc, curr) => {
        return acc + (curr.completed ? 1 : 0);
      }, 0) ?? 0,
    [data]
  );

  return {
    isTasksLoading: isLoading,
    tasksError: error,
    tasks: (data as FetchTasksResponse)?.data || [],
    countOfTotalTasks: (data as FetchTasksResponse)?.items || 0,
    countOfDeletedTasks,
    countOfCompletedTasks,
    pages: (data as FetchTasksResponse)?.pages || 0,
  };
}
