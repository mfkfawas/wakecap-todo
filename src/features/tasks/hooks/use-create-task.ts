import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, type CreateTaskParams } from '@/features/tasks/services';
import { Task } from '@/lib/types';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Task, Error, CreateTaskParams>({
    mutationFn: ({ text }) => createTask({ text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks-with-no-pagination'] });
    },
    onError: (err) => alert(err.message),
  });

  return { isCreating: isPending, createTask: mutate };
}
