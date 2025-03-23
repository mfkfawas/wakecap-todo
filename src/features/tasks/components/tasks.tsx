import { useState } from 'react';
import { Ban, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { usePage } from '@/context/pagination';
import {
  useDeleteTask,
  useFetchTasks,
  useCompleteTask,
} from '@/features/tasks/hooks';
import { Task } from '@/lib/types';

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
    {tasks.map(({ text, id, completed, deleted }) => (
      <TaskListItem
        key={id}
        id={id}
        text={text}
        completed={completed}
        deleted={deleted}
      />
    ))}
  </ul>
);

type TaskListItemProps = {
  id: Task['id'];
  text: Task['text'];
  completed: Task['completed'];
  deleted: Task['deleted'];
};

const TaskListItem = ({ id, text, completed, deleted }: TaskListItemProps) => {
  const [isChecked, setIsChecked] = useState(completed);
  const { isCompleting, completeTask } = useCompleteTask();
  const { isDeleting, deleteTask } = useDeleteTask();

  const handleCompleteTask = () =>
    completeTask(
      { id, text, completed: !isChecked },
      { onSuccess: (data) => setIsChecked(data.completed) }
    );

  const handleDeleteTask = () => deleteTask({ id, text, deleted: true });

  return (
    <li className="flex items-center justify-between p-4 border-b last:border-none">
      <Checkbox
        className="rounded-full h-6 w-6"
        checked={isChecked}
        disabled={isCompleting || deleted}
        onClick={handleCompleteTask}
      />

      <span
        className={` flex gap-2
        ${
          isChecked
            ? 'line-through text-gray-500 dark:text-gray-400'
            : deleted
              ? 'line-through text-red-500 dark:text-red-400 opacity-50 bg-red-100 dark:bg-red-950'
              : 'font-semibold'
        }`}
      >
        {text}

        {deleted ? (
          <Ban strokeWidth={3} className="text-gray-400 cursor-not-allowed" />
        ) : (
          <Trash2
            strokeWidth={3}
            className={
              isDeleting
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-red-500 cursor-pointer'
            }
            onClick={() => !isDeleting && handleDeleteTask()}
          />
        )}
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
