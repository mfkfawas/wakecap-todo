import { Task } from '@/lib/types';
import { TaskListItem } from './tasks-list-item';

export const TasksList = ({ tasks }: { tasks: Task[] }) => (
  <ul>
    {tasks.map(({ text, id, completed, deleted }) => (
      <TaskListItem
        key={id}
        id={id}
        text={text}
        completed={completed}
        deleted={deleted}
      />
    ))}
  </ul>
);
