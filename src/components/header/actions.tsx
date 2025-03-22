import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/features/dark-mode';

export const Actions = () => {
  return (
    <>
      <Button className="rounded-xs">
        <CirclePlus size={32} strokeWidth={3} className="" />
        <span className="font-light">Add Todo</span>
      </Button>

      {/* Dark mode toggler */}
      <ModeToggle />
    </>
  );
};
