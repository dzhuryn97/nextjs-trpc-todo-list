'use client'
import {useForm, SubmitHandler} from "react-hook-form"
import {trpc} from "@/trpc/client";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {RegisterInput} from "@/trpc/routers/auth/register-input";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import Link from "next/link";
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/navigation";

type FormState = z.infer<typeof RegisterInput>;

export default function Register() {
    const {login} = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(RegisterInput)
    });

    const registerMutation = trpc.auth.register.useMutation({
        onSuccess: (data) => {
            login(data.token);
            router.push('/');
        }
    });
    const onSubmit: SubmitHandler<FormState> = (data: FormState) => {
       registerMutation.mutate(data);
    }

    return (
        <main className="max-w-md mx-auto px-4 py-10">
            <div className="bg-white border shadow-sm rounded-2xl p-6">
                <h1 className="text-2xl font-semibold mb-1">Create an account</h1>

                <p className="text-sm text-slate-500 mb-6">
                    Sign up to start managing your tasks.
                </p>

                {registerMutation.isError &&
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800">
                        {registerMutation.error.message}
                    </p>
                </div>
                }

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Name"
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register('name')}
                    />

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
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
                    </Button>
                </form>

                <p className="mt-4 text-xs text-slate-500 text-center">
                    Already have an account?
                    <Link href={"/login"} className="text-sky-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    )
}