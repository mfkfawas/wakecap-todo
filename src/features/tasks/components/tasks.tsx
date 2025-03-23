import { Badge } from '@/components/ui/badge';
import { usePage } from '@/context/pagination';
import { useFetchTasks } from '@/features/tasks/hooks';
import { NoTasksPlaceHolder } from './no-tasks-placeholder';
import { TasksList } from './tasks-list';

export const Tasks = () => {
  const { tasks } = useFetchTasks();

  if (!tasks.length) return <NoTasksPlaceHolder />;

  return (
    <div className=" bg-white dark:bg-zinc-900 shadow shadow-gray-400 dark:shadow-gray-900/50 h-[30rem] w-[25rem] relative overflow-auto">
      <TasksList tasks={tasks} />
      <PageNumber />
    </div>
  );
};

const PageNumber = () => {
  const { page } = usePage();

  return (
    <Badge
      variant="outline"
      className="sticky bottom-2 left-1/2 -translate-x-1/2"
    >
      Page: <span className="font-bold">{page}</span>
    </Badge>
  );
};
