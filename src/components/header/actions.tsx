import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modal';
import { MODAL_ACTIONS } from '@/lib/utils';
import { ModeToggle } from '@/features/dark-mode';

export const Actions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        type={MODAL_ACTIONS.ADD}
      />
    </>
  );
};
