import { useState } from 'react';
import { Trash2, Ban } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/lib/types';
import { useCompleteTask, useDeleteTask } from '@/features/tasks/hooks';

type TaskListItemProps = {
  id: Task['id'];
  text: Task['text'];
  completed: Task['completed'];
  deleted: Task['deleted'];
};

export const TaskListItem = ({
  id,
  text,
  completed,
  deleted,
}: TaskListItemProps) => {
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
