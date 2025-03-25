import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCountBadge } from '.';
import { COUNT_ENTITY } from '@/features/tasks/utils';

describe('TaskCountBadge', () => {
  const TYPE_STYLES = {
    [COUNT_ENTITY.COMPLETED]: 'bg-blue-500',
    [COUNT_ENTITY.DELETED]: 'bg-red-500',
    [COUNT_ENTITY.TOTAL]: 'bg-green-500 text-gray-800 dark:text-gray-200',
  };

  Object.entries(TYPE_STYLES).forEach(([type, expectedClass]) => {
    it(`applies ${expectedClass} for ${type} type`, () => {
      render(<TaskCountBadge type={type} count={1} />);
      expect(screen.getByText('1')).toHaveClass(expectedClass);
    });
  });

  it('renders count visibly', () => {
    render(<TaskCountBadge type={COUNT_ENTITY.TOTAL} count={5} />);
    expect(screen.getByText('5')).toBeVisible();
  });
});
