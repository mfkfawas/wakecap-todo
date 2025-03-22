import { TasksCounts } from '@/features/tasks';
import { Actions } from './actions';
import { Logo } from './logo';

export const Header = () => {
  return (
    <header className="flex h-16 p-2 border-b sticky top-0 z-20">
      <div className="flex items-center justify-between w-full">
        <Logo />
        <div className="flex items-center gap-4">
          <TasksCounts />
          <Actions />
        </div>
      </div>
    </header>
  );
};
