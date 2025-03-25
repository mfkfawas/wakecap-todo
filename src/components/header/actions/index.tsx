import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modal';
import { MODAL_ACTIONS } from '@/lib/utils';
import { ModeToggle } from '@/features/dark-mode';
import { useCreateTask } from '@/features/tasks/hooks';

export const Actions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const { isCreating, createTask } = useCreateTask();

  const handleTaskCreate = () => {
    createTask(
      {
        text: newTask,
      },
      {
        onSuccess: () => setIsModalOpen(false),
      }
    );
  };

  return (
    <>
      <Button
        className="rounded-xs cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <CirclePlus size={32} strokeWidth={3} className="" />
        <span className="font-light">Add Todo</span>
      </Button>

      {/* Dark mode toggler */}
      <ModeToggle />

      <Modal
        type={MODAL_ACTIONS.ADD}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        task={newTask}
        onChangeTask={setNewTask}
        onSubmit={handleTaskCreate}
        disabled={isCreating}
      />
    </>
  );
};
