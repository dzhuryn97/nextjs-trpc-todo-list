'use client';
import { IconButton } from '../ui/IconButton';
import { XIcon } from '../ui/XIcon';
import { trpc } from '@/trpc/client';

type RemoveTaskComponentProps = {
  taskId: string;
};

export function RemoveTask({ taskId }: RemoveTaskComponentProps) {
  const utils = trpc.useUtils();
  const removeTaskMutation = trpc.tasks.remove.useMutation({
    onSuccess: () => {
      utils.tasks.invalidate();
    },
  });

  const handleRemove = () => {
    removeTaskMutation.mutate({ id: taskId });
  };

  return (
    <IconButton
      onClick={handleRemove}
      variant="danger"
      aria-label="Remove task"
      disabled={removeTaskMutation.isPending}
    >
      <XIcon />
    </IconButton>
  );
}
