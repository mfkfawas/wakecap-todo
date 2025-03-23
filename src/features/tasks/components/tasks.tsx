import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { usePage } from '@/context/pagination';
import { useFetchTasks } from '@/features/tasks/hooks/use-fetch-tasks';
import { Task } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

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

const NoTasksPlaceHolder = () => (
  <div className="grid place-items-center">
    Sorry, you have no todos, Please add new todo.
  </div>
);

const TasksList = ({ tasks }: { tasks: Task[] }) => (
  <ul>
    {tasks.map(({ text, id, completed }) => (
      <TaskListItem key={id} text={text} completed={completed} />
    ))}
  </ul>
);

type TaskListItemProps = {
  text: Task['text'];
  completed: Task['completed'];
};

const TaskListItem = ({ text, completed }: TaskListItemProps) => {
  const [isChecked, setIsChecked] = useState(completed);

  return (
    <li className="flex items-center justify-between p-4 border-b last:border-none">
      <Checkbox className="rounded-full h-6 w-6" checked={isChecked} />

      <span
        className={` flex gap-2
        ${
          isChecked
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'font-semibold'
        }`}
      >
        {text}
        <Trash2 strokeWidth={3} color="red" cursor="pointer" />
      </span>
    </li>
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
