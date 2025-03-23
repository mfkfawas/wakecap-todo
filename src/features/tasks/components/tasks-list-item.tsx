import { useState } from 'react';
import { Trash2, Ban } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Modal } from '@/components/modal';
import { MODAL_ACTIONS } from '@/lib/utils';
import { Task } from '@/lib/types';
import {
  useCompleteTask,
  useDeleteTask,
  useUpdateTask,
} from '@/features/tasks/hooks';

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
  const { isUpdating, updateTask } = useUpdateTask();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(text);

  const handleCompleteTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    completeTask(
      { id, text, completed: !isChecked },
      { onSuccess: (data) => setIsChecked(data.completed) }
    );
  };

  const handleDeleteTask = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    deleteTask({ id, text, deleted: true });
  };

  const handleTaskUpdate = () => {
    updateTask(
      {
        id,
        text: updatedTask,
        completed,
      },
      {
        onSuccess: () => setIsUpdateModalOpen(false),
      }
    );
  };

  return (
    <>
      <li
        className={`flex items-center justify-between p-4 border-b last:border-none ${!deleted ? 'hover:bg-gray-50 hover:dark:bg-gray-950  cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={() => {
          if (deleted) return;

          setIsUpdateModalOpen(true);
        }}
      >
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
              onClick={(e) => !isDeleting && handleDeleteTask(e)}
            />
          )}
        </span>
      </li>

      <Modal
        type={MODAL_ACTIONS.UPDATE}
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        task={updatedTask}
        onChangeTask={setUpdatedTask}
        onSubmit={handleTaskUpdate}
        disabled={isUpdating}
      />
    </>
  );
};
