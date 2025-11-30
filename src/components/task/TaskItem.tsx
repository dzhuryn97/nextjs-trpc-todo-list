import { CompleteTask } from './CompleteTask';
import { RemoveTask } from './RemoveTask';

type TaskItemProps = {
  taskId: string;
  title: string;
  description: string|null;
  completed: boolean;
};

export function TaskItem({ taskId, title, description, completed }: TaskItemProps) {
  return (
    <div className="flex items-start gap-3 p-4">
      <CompleteTask taskId={taskId} completed={completed} />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <RemoveTask taskId={taskId} />
    </div>
  );
}
