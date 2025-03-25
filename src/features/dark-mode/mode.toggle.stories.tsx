// src/components/theme-provider/mode-toggle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ModeToggle } from '.';
import { ThemeProvider } from '@/components/theme-provider';
import { fn } from '@storybook/test';

const meta: Meta<typeof ModeToggle> = {
  title: 'Features/Theme/ModeToggle',
  component: ModeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    setTheme: fn(),
  },
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkModeInitial: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const InteractiveExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Try clicking the toggle and selecting different themes from the dropdown.',
      },
    },
  },
};
