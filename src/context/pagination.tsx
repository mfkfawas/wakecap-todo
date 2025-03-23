import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

interface PageContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

function PageProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState(1);
  const value = useMemo(() => ({ page, setPage }), [page]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}

export { PageProvider, usePage };
