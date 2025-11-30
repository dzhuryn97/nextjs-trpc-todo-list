import {router, publicProcedure, protectedProcedure} from '../../init';
import {taskService} from "@/server/services/tasks";
import {CreateTaskInput} from "@/trpc/routers/task/task-input";
import {z} from "zod";

export const taskRouter = router({
    list: protectedProcedure.query((opts) => {
        return taskService.getUserTasks(opts.ctx.user.id)
    }),
    create: protectedProcedure
        .input(CreateTaskInput)
        .mutation(async ({input, ctx}) => {
            await taskService.createTask(input.title, input.description, ctx.user.id);
        }),
    remove: protectedProcedure
        .input(z.object({id: z.string()}))
        .mutation(async ({input, ctx}) => {
            await taskService.removeTask(input.id, ctx.user.id);
        }),

    complete: protectedProcedure
        .input(z.object({id: z.string(), completed: z.boolean()}))
        .mutation(async ({input, ctx}) => {
            await taskService.completeTask(input.id, ctx.user.id, input.completed);
        }),
});