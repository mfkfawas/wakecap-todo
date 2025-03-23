import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePage } from '@/context/pagination';
import { useFetchTasks } from '@/features/tasks/hooks';

// Constants for pagination logic
const ELLIPSIS_THRESHOLD = 4; // When to show ellipsis

export const Pagination = () => {
  const { page, setPage } = usePage();
  const { pages } = useFetchTasks();

  // Function to generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Helper function to add a page link
    const addPageLink = (pageNumber: number) => {
      items.push(
        <PaginationItem key={pageNumber}>
          <PaginationLink
            onClick={() => setPage(pageNumber)}
            isActive={page === pageNumber}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    };

    // Always show the first page
    addPageLink(1);

    // Show ellipsis if current page is far from the start
    if (page - ELLIPSIS_THRESHOLD > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around the current page
    const start = Math.max(2, page - ELLIPSIS_THRESHOLD);
    const end = Math.min(pages - 1, page + ELLIPSIS_THRESHOLD);

    for (let i = start; i <= end; i++) {
      addPageLink(i);
    }

    // Show ellipsis if current page is far from the end
    if (page + ELLIPSIS_THRESHOLD < pages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show the last page
    if (pages > 1) {
      addPageLink(pages);
    }

    return items;
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem aria-disabled={page === 1}>
          <PaginationPrevious
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            onClick={() => page > 1 && setPage((prevPage) => prevPage - 1)}
          />
        </PaginationItem>

        {/* Render Pagination Items */}
        {renderPaginationItems()}

        {/* Next Button */}
        <PaginationItem aria-disabled={page === pages}>
          <PaginationNext
            className={page === pages ? 'pointer-events-none opacity-50' : ''}
            onClick={() => page < pages && setPage((prevPage) => prevPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
