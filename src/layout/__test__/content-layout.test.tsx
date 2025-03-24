import { render, screen } from '@testing-library/react';
import { ContentLayout } from '../content-layout';
import { describe, expect, it } from 'vitest';

describe('ContentLayout', () => {
  it('renders children within the layout structure', () => {
    render(
      <ContentLayout>
        <div data-testid="test-child">Test Content</div>
      </ContentLayout>
    );

    // Verify the main container exists
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Verify children are rendered
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
