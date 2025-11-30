"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {JWTUser} from "@/server/lib/jwt-service";
import {jwtService} from "@/server/lib/jwt-service";
import jwt from "jsonwebtoken";

interface AuthContextType {
  user: JWTUser | null
  login: (token: string) => any
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<JWTUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(jwtService.decode(storedUser))
    }
    setIsLoading(false)
  }, [])


  const login = async (token: string) => {
     const user = jwtService.decode(token);
      localStorage.setItem("user", token);

      setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
