import {server$} from "@builder.io/qwik-city";
import todoService from "~/services/todo.service";


export const getTodos = server$(async () => {
    return await todoService.getAll();
})