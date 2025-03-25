import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoTasksPlaceHolder } from '.';

describe('NoTasksPlaceHolder', () => {
  it('renders the correct message', () => {
    render(<NoTasksPlaceHolder />);
    expect(screen.getByText(/sorry, you have no todos/i)).toBeInTheDocument();
    expect(screen.getByText(/please add new todo/i)).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<NoTasksPlaceHolder />);
    const container = screen.getByRole('status');
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('place-items-center');
  });
});
