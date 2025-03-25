import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { COUNT_ENTITY } from '@/features/tasks/utils';
import { TaskCountBadge } from '.';

type StoryProps = ComponentProps<typeof TaskCountBadge>;

const meta: Meta<StoryProps> = {
  title: 'Features/Tasks/TaskCountBadge',
  component: TaskCountBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(COUNT_ENTITY),
    },
    count: {
      control: { type: 'number', min: 0 },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Deleted: Story = {
  args: {
    count: 5,
    type: COUNT_ENTITY.DELETED,
  },
};

export const Completed: Story = {
  args: {
    count: 5,
    type: COUNT_ENTITY.COMPLETED,
  },
};

export const Total: Story = {
  args: {
    count: 5,
    type: COUNT_ENTITY.TOTAL,
  },
};

export const TotalLargeCount = {
  args: {
    type: COUNT_ENTITY.TOTAL,
    count: 42, // Show larger number for demo
  },
};

export const ZeroCount = {
  args: {
    count: 0,
    type: COUNT_ENTITY.COMPLETED,
  },
};
