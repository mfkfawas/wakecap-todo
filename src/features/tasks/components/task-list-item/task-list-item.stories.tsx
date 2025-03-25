// src/features/tasks/components/task-list-item.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TaskListItem } from '.';

const meta: Meta<typeof TaskListItem> = {
  title: 'Features/Tasks/TaskListItem', // Updated story hierarchy
  component: TaskListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveTask: Story = {
  args: {
    id: '1',
    text: 'Buy groceries',
    completed: false,
    deleted: false,
  },
};

export const CompletedTask: Story = {
  args: {
    id: '2',
    text: 'Walk the dog',
    completed: true,
    deleted: false,
  },
};

export const DeletedTask: Story = {
  args: {
    id: '3',
    text: 'Old task',
    completed: false,
    deleted: true,
  },
};
