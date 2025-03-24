import { describe, it, expect, vi } from 'vitest';
import { render, act, renderHook } from '@testing-library/react';
import { PageProvider, usePage } from './pagination';

describe('PageContext', () => {
  it('throws error when usePage is used outside provider', () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => usePage());
    }).toThrow('usePage must be used within a PageProvider');

    console.error = originalError;
  });

  it('provides default page value and setter', () => {
    let pageValue: number | undefined;
    let setter: any;

    const TestComponent = () => {
      const { page, setPage } = usePage();
      pageValue = page;
      setter = setPage;
      return null;
    };

    render(
      <PageProvider>
        <TestComponent />
      </PageProvider>
    );

    expect(pageValue).toBe(1);
    expect(typeof setter).toBe('function');
  });

  it('updates page value when setPage is called', () => {
    let testPage: number;
    let testSetPage: any;

    const TestComponent = () => {
      const { page, setPage } = usePage();
      testPage = page;
      testSetPage = setPage;
      return null;
    };

    render(
      <PageProvider>
        <TestComponent />
      </PageProvider>
    );

    act(() => {
      testSetPage(2);
    });

    expect(testPage).toBe(2);

    act(() => {
      testSetPage((prev) => prev + 1);
    });

    expect(testPage).toBe(3);
  });
});
