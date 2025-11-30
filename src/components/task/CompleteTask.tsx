'use client';
import {Checkbox} from '../ui/Checkbox';
import {trpc} from '@/trpc/client';

type CompleteTaskProps = {
    taskId: string;
    completed: boolean;
};

export function CompleteTask({taskId, completed}: CompleteTaskProps) {
    const utils = trpc.useUtils();
    const completeTaskMutation = trpc.tasks.complete.useMutation({
        onSuccess: () => {
            utils.tasks.invalidate();
        },
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        completeTaskMutation.mutate({
            id: taskId,
            completed: e.target.checked,
        });
    };

    return (
        <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            disabled={completeTaskMutation.isPending}
        />
    );
}
