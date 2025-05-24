import { server$ } from "@builder.io/qwik-city";
import { TodoInterface } from "~/types/todo.type";


const todos: TodoInterface[] = [
    {
        id: 1,
        content: "TODO 1",
        completed: false
    },
    {
        id: 2,
        content: "TODO 2",
        completed: true
    }
];

export const getAllTodos = server$(async (): Promise<TodoInterface[]> => {
    return todos;
})

export const getTodoById = server$(async (id: number): Promise<TodoInterface | undefined> => {
    return todos.find(t => t.id == id)
})