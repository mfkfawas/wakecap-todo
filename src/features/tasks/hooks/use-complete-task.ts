import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, type UpdateTaskParams } from '@/features/tasks/services';
import { Task } from '@/lib/types';

export function useCompleteTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: ({ id, text, completed }) =>
      updateTask({ id, text, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks-with-no-pagination'] });
    },
    onError: (err) => alert(err.message),
  });

  return { isCompleting: isPending, completeTask: mutate };
}
