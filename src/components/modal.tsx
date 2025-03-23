import { useState } from 'react';
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

type ModalProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  type: (typeof MODAL_ACTIONS)[keyof typeof MODAL_ACTIONS];
  task: string;
  onChangeTask: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  disabled: boolean;
};

export const Modal = ({
  open,
  onOpenChange,
  type,
  task,
  onChangeTask,
  onSubmit,
  disabled,
}: ModalProps) => {
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
          onChange={(e) => onChangeTask(e.target.value)}
          disabled={disabled}
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={disabled}
          >
            Cancel
          </Button>

          <Button onClick={onSubmit} disabled={disabled}>
            {type === MODAL_ACTIONS.ADD && 'Add'}
            {type === MODAL_ACTIONS.UPDATE && 'Update'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
