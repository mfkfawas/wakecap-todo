import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/features/tasks/services';
import { usePage } from '@/context/pagination';
import { Task } from '@/lib/types';

export function useFetchTasksWithNoPagination() {
  const { page } = usePage();

  const { isLoading, data, error } = useQuery({
    queryKey: ['tasks-with-no-pagination'],
    queryFn: () => fetchTasks({ page, noPagination: true }),
  });

  const countOfDeletedTasks = useMemo(
    () =>
      (data as Task[])?.reduce((acc, curr) => {
        return acc + (curr.deleted ? 1 : 0);
      }, 0) ?? 0,
    [data]
  );

  const countOfCompletedTasks = useMemo(
    () =>
      (data as Task[])?.reduce((acc, curr) => {
        return acc + (curr.completed ? 1 : 0);
      }, 0) ?? 0,
    [data]
  );

  return {
    isTasksLoading: isLoading,
    tasksError: error,
    countOfTotalTasks: (data as Task[])?.length,
    countOfDeletedTasks,
    countOfCompletedTasks,
  };
}
