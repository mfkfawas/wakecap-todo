import { Header } from '@/components/header';
import { Pagination } from '@/components/pagination';
import { Tasks } from '@/features/tasks';
import { ContentLayout } from '../content-layout';

export function AppLayout() {
  return (
    <div className="max-h-screen" data-testid="app-layout">
      <Header />

      <ContentLayout>
        <Tasks />
        <Pagination />
      </ContentLayout>
    </div>
  );
}
