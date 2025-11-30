'use client'
import {useForm, SubmitHandler} from "react-hook-form"
import {trpc} from "@/trpc/client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {RegisterInput} from "@/trpc/routers/auth/register-input";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {LoginInput} from "@/trpc/routers/auth/login-input";
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/navigation"
import Link from "next/link";

type FormState = z.infer<typeof LoginInput>;

export default function Register() {
    const {user, isLoading,  login} = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(LoginInput)
    });

    if(!isLoading && user){
        router.push('/');
    }

    const loginMutation = trpc.auth.login.useMutation({
        onSuccess: (data) => {
            login(data.token);
            router.push('/');
        }
    });


    const onSubmit: SubmitHandler<FormState> = (data: FormState) => {
        loginMutation.mutate(data)
    }

    return (
        <main className="max-w-md mx-auto px-4 py-10">
            <div className="bg-white border shadow-sm rounded-2xl p-6">
                <h1 className="text-2xl font-semibold mb-1">Login</h1>

                {loginMutation.isError &&
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-800">
                            {loginMutation.error.message}
                        </p>
                    </div>
                }

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <p className="mt-4 text-xs text-slate-500 text-center">
                    Doesn't have an account?
                    <Link href="/register" className="text-sky-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
}