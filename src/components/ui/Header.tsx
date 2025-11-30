'use client'
import Link from "next/link";
import {useAuth} from "@/components/AuthContext";


export function Header() {
    const {user, logout, isLoading} = useAuth()
    
    function onLogout() {
        logout()
    }

    return <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white font-bold">T</span>
                <Link href="/" className="font-semibold text-lg">Tasky</Link>
            </div>


            <div className="flex items-center gap-3">
                {!isLoading && <>
                    {user ? <>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-700">Hi, {user.name}</span>
                                <button className="text-xs text-slate-500 hover:text-red-500" onClick={logout}>Logout</button>
                            </div>
                        </> :
                        <>
                            <Link prefetch={true}
                                  href="/login"
                                  className="inline-flex items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600"
                            >Sign in
                            </Link>
                            <Link prefetch={true}
                                  href="/register"
                                  className="inline-flex items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600"
                            >Sign up
                            </Link>
                        </>
                    }
                </>}


            </div>
        </div>
    </header>;
}