import { useFetchTasks } from '@/features/tasks/hooks/use-fetch-tasks';
import { COUNT_ENTITY } from '@/features/tasks/utils';
import { TaskCountBadge } from './task-count-badge';

export const TasksCounts = () => {
  const { countOfCompletedTasks, countOfDeletedTasks, countOfTotalTasks } =
    useFetchTasks();

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
        <TaskCountBadge count={count} type={type} />
      ))}
    </div>
  );
};
