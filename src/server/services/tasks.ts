import {prisma} from '../../../prisma/prisma';
import {EntityNotFoundException} from "@/server/errors";

class Tasks {
    public async getUserTasks(userId: string) {
        return prisma.task.findMany({
            where: {
                userId: userId
            }
        });
    }

    public async createTask(title: string, description: string|null, userId: string) {
        await prisma.task.create({
            data: {
                title: title,
                description: description,
                userId: userId,
            }
        })
    }

    public async removeTask(id: string, userId: string) {
        await this.getUserTask(id, userId);

        await prisma.task.delete({
            where: {
                id: id
            }
        });
    }

    public async completeTask(id: string, userId: string, completed: boolean) {
        await this.getUserTask(id, userId);

        await prisma.task.update({
            where: {
                id: id
            },
            data: {
                completed: completed
            }
        });
    }


    private async getUserTask(id: string, userId: string) {
        const task = await prisma.task.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!task) {
            throw new EntityNotFoundException(`Task with ${id} not found`);
        }

        return task;
    }
}

export const taskService = new Tasks();