import { render, screen } from '@testing-library/react';
import { AppLayout } from '.';
import { describe, expect, it, vi } from 'vitest';

// Mock child components to isolate tests
vi.mock('@/components/header', () => ({
  Header: () => <header data-testid="header" />,
}));

vi.mock('@/features/tasks', () => ({
  Tasks: () => <div data-testid="tasks" />,
}));

vi.mock('@/components/pagination', () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

vi.mock('../content-layout', () => ({
  ContentLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-layout">{children}</div>
  ),
}));

describe('AppLayout', () => {
  it('renders all required layout components', () => {
    render(<AppLayout />);

    // Verify all critical components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('content-layout')).toBeInTheDocument();
    expect(screen.getByTestId('tasks')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('wraps tasks and pagination in content layout', () => {
    render(<AppLayout />);

    const contentLayout = screen.getByTestId('content-layout');
    expect(contentLayout).toContainElement(screen.getByTestId('tasks'));
    expect(contentLayout).toContainElement(screen.getByTestId('pagination'));
  });
});
