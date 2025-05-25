import { PrismaClient } from "@prisma/client";
import {TodoInterface} from "~/types/todo.type";

class TodoService {
    private prisma = new PrismaClient();

    async delete(id: number): Promise<TodoInterface> {
        try {
            return await this.prisma.todo.delete({ where: { id } });
        } catch (e: any) {
            throw new Error("Error: " + e.message);
        }
    }

    async create(title: string, content: string): Promise<TodoInterface> {
        try {
            return await this.prisma.todo.create({
                data: {
                    title,
                    content,
                    completed: false
                },
            });
        } catch (e: any) {
            throw new Error("Error: " + e.message);
        }
    }

    async getAll(): Promise<TodoInterface[]> {
        try {
            return await this.prisma.todo.findMany();
        } catch (e: any) {
            throw new Error("Error: " + e.message);
        }
    }

    async update(todo: TodoInterface): Promise<TodoInterface> {
        try {
            const { id, ...todoWithoutId } = todo;

            return await this.prisma.todo.update({
                where: { id },
                data: todoWithoutId,
            });
        } catch (e: any) {
            throw new Error("Error: " + e.message);
        }
    }

    async toggle(id: number, completed: boolean): Promise<TodoInterface> {
        try {
            return await this.prisma.todo.update({
                where: { id },
                data: {
                    completed
                },
            });
        } catch (e: any) {
            throw new Error("Error: " + e.message);
        }
    }

    async getById(id: number): Promise<TodoInterface | null> {
        try {
            return await this.prisma.todo.findUnique({
                where: { id },
            });
        } catch (e: any) {
            throw new Error("Une erreur est survenue lors de la récupération du todo" + e.message);
        }
    }
}

const todoService: TodoService = new TodoService();
export default todoService;