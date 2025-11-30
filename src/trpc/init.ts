import {initTRPC, TRPCError} from '@trpc/server';
import superjson from 'superjson';
import {ZodError} from 'zod';
import {FetchCreateContextFnOptions} from '@trpc/server/adapters/fetch';
import {jwtService, JWTUser} from "@/server/lib/jwt-service";


export async function createContext({
                                        req,
                                    }: FetchCreateContextFnOptions) {
    async function getUserFromHeader() {
        const authHeader = req.headers.get('authorization');
        if (authHeader) {
            return jwtService.verify(
                authHeader.split(' ')[1],
            );
        }
        return null;
    }


    const user = await getUserFromHeader();
    return {
        user,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({shape, error}) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const protectedProcedure = t.procedure.use(
    async function isAuthed(opts) {
        const {ctx} = opts;
        if (!ctx.user) {

            throw new TRPCError({code: 'UNAUTHORIZED'});
        }
        return opts.next({
            ctx: {
                user: ctx.user,
            },
        });
    },
);


export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const middleware = t.middleware;
