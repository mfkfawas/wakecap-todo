// src/App.test.tsx
import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it } from 'vitest';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);

    // make sure the child of App is in the DOM
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
  });
});
