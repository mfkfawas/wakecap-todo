import { Badge } from '@/components/ui/badge';
import { usePage } from '@/context/pagination';
import { useFetchTasks } from '@/features/tasks/hooks/use-fetch-tasks';
import { Task } from '@/lib/types';

export const Tasks = () => {
  const { tasks } = useFetchTasks();

  if (!tasks.length) return <NoTasksPlaceHolder />;

  return (
    <div className=" bg-white dark:bg-zinc-900 shadow shadow-gray-400 dark:shadow-gray-900/50 h-[30rem] w-[25rem] relative">
      <TasksList tasks={tasks} />
      <PageNumber />
    </div>
  );
};

const NoTasksPlaceHolder = () => (
  <div className="grid place-items-center">
    Sorry, you have no todos, Please add new todo.
  </div>
);

const TasksList = ({ tasks }: { tasks: Task[] }) => (
  <ul>
    {tasks.map(({ text, id }) => (
      <TaskListItem key={id} text={text} />
    ))}
  </ul>
);

const TaskListItem = ({ text }: { text: Task['text'] }) => (
  <li className="flex items-center justify-between p-2 border-b last:border-none">
    {text}
  </li>
);

const PageNumber = () => {
  const { page } = usePage();

  return (
    <Badge
      variant="outline"
      className="absolute bottom-2 left-1/2 -translate-x-1/2"
    >
      Page: <span className="font-bold">{page}</span>
    </Badge>
  );
};
