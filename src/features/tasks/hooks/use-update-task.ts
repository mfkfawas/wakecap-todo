import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, type UpdateTaskParams } from '@/features/tasks/services';
import { Task } from '@/lib/types';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: ({ id, text, completed }) =>
      updateTask({ id, text, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (err) => alert(err.message),
  });

  return { isUpdating: isPending, updateTask: mutate };
}
