'use client';

import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {trpc} from "@/trpc/client";
import {CreateTaskInput} from "@/trpc/routers/task/task-input";
import {Input} from "@/components/ui/Input";
import {Textarea} from "@/components/ui/Textarea";
import {Button} from "@/components/ui/Button";

type FormState = z.infer<typeof CreateTaskInput>;

export function AddTaskForm() {
  const utils = trpc.useUtils();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormState>({
    resolver: zodResolver(CreateTaskInput)
  });

  const createTaskMutation = trpc.tasks.create.useMutation({
    onSuccess: () => {
      reset();
      // Invalidate and refetch the tasks query
      utils.tasks.invalidate();
    }
  });

  const onSubmit: SubmitHandler<FormState> = (data: FormState) => {
    createTaskMutation.mutate(data);
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Add new task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border shadow-sm rounded-xl p-4 space-y-4">
        {createTaskMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              {createTaskMutation.error.message}
            </p>
          </div>
        )}

        <Input
          id="title"
          label="Title"
          type="text"
          placeholder="What do you need to do?"
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          id="description"
          label="Description"
          rows={3}
          placeholder="Optional details about the task..."
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="flex items-center justify-between">
          <div className="space-x-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
              New task
            </span>
          </div>
          <Button type="submit" className="!w-auto" disabled={createTaskMutation.isPending}>
            {createTaskMutation.isPending ? 'Adding...' : 'Add task'}
          </Button>
        </div>
      </form>
    </section>
  );
}
