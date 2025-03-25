import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Actions } from '.';
import { useCreateTask } from '@/features/tasks/hooks';
import userEvent from '@testing-library/user-event';

vi.mock('lucide-react', () => ({
  CirclePlus: vi.fn(() => <svg data-testid="plus-icon" />),
}));

vi.mock('@/features/tasks/hooks', () => ({
  useCreateTask: vi.fn(() => ({
    isCreating: false,
    createTask: vi.fn(),
  })),
}));

vi.mock('@/features/dark-mode', () => ({
  ModeToggle: vi.fn(() => <div data-testid="mode-toggle" />),
}));

vi.mock('@/components/modal', () => ({
  Modal: vi.fn(
    ({ open, onSubmit, onChangeTask, task }) =>
      open && (
        <div data-testid="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <input
              type="text"
              role="textbox"
              data-testid="task-input"
              value={task}
              onChange={(e) => onChangeTask(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )
  ),
}));

describe('Actions Component', () => {
  it('renders add button and mode toggle', () => {
    render(<Actions />);

    expect(screen.getByText('Add Todo')).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('opens modal when add button is clicked', () => {
    render(<Actions />);

    fireEvent.click(screen.getByText('Add Todo'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('creates task when modal is submitted', async () => {
    const mockCreate = vi.fn();
    vi.mocked(useCreateTask).mockReturnValue({
      isCreating: false,
      createTask: mockCreate,
    });

    render(<Actions />);

    // Open modal
    await userEvent.click(screen.getByText('Add Todo'));

    // Type into input
    await userEvent.type(screen.getByRole('textbox'), 'New task');

    // Submit form
    await userEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith(
        { text: 'New task' },
        { onSuccess: expect.any(Function) }
      );
    });
  });
});
