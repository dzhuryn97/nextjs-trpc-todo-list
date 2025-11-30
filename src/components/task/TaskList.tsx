'use client';
import { TaskItem } from './TaskItem';
import {trpc} from "@/trpc/client";


export function TaskList() {

  const tasks = trpc.tasks.list.useQuery()



  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">My tasks</h1>
        <span className="text-sm text-slate-500">{tasks.data && tasks.data.length } tasks</span>
      </div>

      <div className="bg-white shadow-sm rounded-xl divide-y border">
        {tasks.data && tasks.data.map((task) => (
          <TaskItem
            key={task.id}
            taskId={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
          />
        ))}
      </div>
    </section>
  );
}
