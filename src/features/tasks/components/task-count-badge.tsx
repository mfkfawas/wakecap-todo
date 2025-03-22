import { Badge } from '@/components/ui/badge';
import { COUNT_ENTITY } from '@/features/tasks/utils';

const badgeColor = {
  [COUNT_ENTITY.COMPLETED]: 'bg-blue-500',
  [COUNT_ENTITY.DELETED]: 'bg-red-500',
  [COUNT_ENTITY.TOTAL]: 'bg-green-500',
};

type TaskCountBadgeProps = {
  count: number;
  type: keyof typeof badgeColor;
};

export const TaskCountBadge = ({ count, type }: TaskCountBadgeProps) => {
  return (
    <Badge
      className={`${badgeColor[type]} rounded-full shadow-md shadow-gray-400 w-8 h-8 flex items-center justify-center text-center`}
    >
      {count}
    </Badge>
  );
};
