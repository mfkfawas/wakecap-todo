import { Header } from '@/components/header';
import { Tasks } from '@/features/tasks';
import { ContentLayout } from './content-layout';

export function AppLayout() {
  return (
    <div className="max-h-screen">
      <Header />

      <ContentLayout>
        <Tasks />
        <Pagination />
      </ContentLayout>
    </div>
  );
}

const Pagination = () => {
  return <div>pagination</div>;
};
