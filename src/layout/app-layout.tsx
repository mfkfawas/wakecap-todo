import { Header } from '@/components/header';
import { ContentLayout } from './content-layout';
import { useFetchTasks } from '@/features/tasks/hooks/use-fetch-tasks';

export function AppLayout() {
  return (
    <div className="max-h-screen">
      <Header />

      <ContentLayout>
        <Todos />
        <Pagination />
      </ContentLayout>
    </div>
  );
}

const Todos = () => {
  const { tasks } = useFetchTasks();

  if (!tasks.length)
    return (
      <div className="grid place-items-center">
        Sorry, you have no todos, Please add new todo.
      </div>
    );

  return (
    <div className=" bg-white dark:bg-zinc-900 shadow shadow-gray-400 dark:shadow-gray-900/50 h-[30rem] w-[25rem]">
      <ul>
        {tasks.map(({ text }) => (
          <li className="flex items-center justify-between p-2 border-b last:border-none">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pagination = () => {
  return <div>pagination</div>;
};
