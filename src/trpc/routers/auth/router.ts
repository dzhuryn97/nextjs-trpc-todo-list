import {router, publicProcedure, protectedProcedure} from '../../init';
import {RegisterInput} from "@/trpc/routers/auth/register-input";
import {authService} from "@/server/services/auth";
import {LoginInput} from "@/trpc/routers/auth/login-input";
export const authRouter = router({
    register: publicProcedure
        .input(RegisterInput)
        .mutation(async ({input}) => {
            const token = await authService.register(input.name, input.email, input.password);
            return {
                token: token,
            };
        }),
    login: publicProcedure
        .input(LoginInput)
        .mutation(async ({input}) => {
            const token = await authService.login(input.email, input.password);
            return {
                token: token,
            };
        })
});