import {routeAction$, zod$, z} from "@builder.io/qwik-city";
import todoService from "~/services/todo.service";

// eslint-disable-next-line qwik/loader-location
export const createTodoAction = routeAction$(
    async (data) => {
        console.log('🔄 Service create appelé avec:', data);
        try {
            return await todoService.create(data.title, data.content);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer le todo");
        }
    },
    zod$({
        title: z.string().min(1),
        content: z.string().min(1),
    })
);

// eslint-disable-next-line qwik/loader-location
export const updateTodoAction = routeAction$(
    async (data) => {
        try {
            return await todoService.update(data);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour le todo");
        }
    },
    zod$({
        id: z.number().min(0),
        title: z.string().min(1),
        content: z.string().min(1),
        completed: z.boolean(),
    })
);

// eslint-disable-next-line qwik/loader-location
export const toggleTodoAction = routeAction$(
    async (data) => {
        console.log('🔄 Action toggle appelé avec:', data);
        try {
            return await todoService.toggle(data.id, data.completed);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de mettre à jour le todo");
        }
    },
    zod$({
        id: z.number().min(0),
        completed: z.boolean(),
    })
);

// eslint-disable-next-line qwik/loader-location
export const deleteTodoAction = routeAction$(
    async (data) => {
        console.log('🔄 Action delete appelé avec:', data);

        try {
            return await todoService.delete(data.id);
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer le todo");
        }
    },
    zod$({
        id: z.number().min(1),
    })
);