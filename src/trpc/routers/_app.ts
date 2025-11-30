import {router, publicProcedure, createCallerFactory, protectedProcedure} from '../init';
import {authRouter} from "@/trpc/routers/auth/router";
import {taskRouter} from "@/trpc/routers/task/router";


export const appRouter = router({
    auth: authRouter,
    tasks: taskRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

