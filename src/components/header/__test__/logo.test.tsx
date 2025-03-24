// src/components/header/logo.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from '../logo';

describe('Logo Component', () => {
  it('displays the correct logo text and icon', () => {
    render(<Logo />);

    expect(screen.getByText('The Todo')).toBeInTheDocument();
  });
});
