import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, type UpdateTaskParams } from '@/features/tasks/services';
import { Task } from '@/lib/types';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Task, Error, UpdateTaskParams>({
    mutationFn: ({ id, text, deleted }) => updateTask({ id, text, deleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks-with-no-pagination'] });
    },
    onError: (err) => alert(err.message),
  });

  return { isDeleting: isPending, deleteTask: mutate };
}
