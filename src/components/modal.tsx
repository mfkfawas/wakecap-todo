import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MODAL_ACTIONS } from '@/lib/utils';
import { useState } from 'react';

type ModalProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  type: (typeof MODAL_ACTIONS)[keyof typeof MODAL_ACTIONS];
  task: string;
  onChangeTask: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  disabled: boolean;
};

const taskSchema = z.object({
  task: z
    .string()
    .min(3, 'Task must be at least 3 characters long')
    .max(255, 'Task cannot exceed 255 characters'),
});

export const Modal = ({
  open,
  onOpenChange,
  type,
  task,
  onChangeTask,
  onSubmit,
  disabled,
}: ModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const validation = taskSchema.safeParse({ task });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setError(null);
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === MODAL_ACTIONS.ADD && 'Add Todo'}
            {type === MODAL_ACTIONS.UPDATE && 'Update Todo'}
          </DialogTitle>

          {/* keeping this to remove console warning from shadcn */}
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder={
            type === MODAL_ACTIONS.ADD ? 'Add your task' : 'Update your task'
          }
          value={task}
          onChange={(e) => {
            setError(null);
            onChangeTask(e.target.value);
          }}
          disabled={disabled}
          className={`w-full p-2 border rounded-md outline-none transition-all 
            ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-200'}
          `}
        />
        <p className="text-red-500 text-sm h-2">{error}</p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={disabled}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={disabled || Boolean(error)}>
            {type === MODAL_ACTIONS.ADD && 'Add'}
            {type === MODAL_ACTIONS.UPDATE && 'Update'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
