import { useFetchTasksWithNoPagination } from '@/features/tasks/hooks';
import { COUNT_ENTITY } from '@/features/tasks/utils';
import { TaskCountBadge } from './task-count-badge';

export const TasksCounts = () => {
  const { countOfCompletedTasks, countOfDeletedTasks, countOfTotalTasks } =
    useFetchTasksWithNoPagination();

  const counts = [
    {
      type: COUNT_ENTITY.COMPLETED,
      count: countOfCompletedTasks,
    },
    {
      type: COUNT_ENTITY.DELETED,
      count: countOfDeletedTasks,
    },
    {
      type: COUNT_ENTITY.TOTAL,
      count: countOfTotalTasks,
    },
  ];

  return (
    <div className="flex gap-2">
      {counts.map(({ count, type }) => (
        <TaskCountBadge key={type} count={count} type={type} />
      ))}
    </div>
  );
};
