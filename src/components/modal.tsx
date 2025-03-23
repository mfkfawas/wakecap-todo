import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
} as const;

type ModalProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  type: (typeof ACTIONS)[keyof typeof ACTIONS];
};

export const Modal = ({ open, onOpenChange, type }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === ACTIONS.ADD && 'Add Todo'}
            {type === ACTIONS.UPDATE && 'Update Todo'}
          </DialogTitle>

          {/* keeping this to remove console warning from shadcn */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Textarea placeholder={'Add your task'} />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            {type === ACTIONS.ADD && 'Add'}
            {type === ACTIONS.UPDATE && 'Update'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
