'use client';
import { TaskList } from '@/components/task/TaskList';
import { AddTaskForm } from '@/components/task/AddTaskForm';
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    const {user, isLoading} = useAuth();
    if(!user && !isLoading){

        return 'Login to get access to Tasks';
    }
  return (
    <>
      <TaskList />
      <AddTaskForm />
    </>
  );
}
