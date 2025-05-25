import {$, component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {routeLoader$} from "@builder.io/qwik-city";
import TodoCard from "~/components/todo/todo-card";
import type {TodoInterface} from "~/types/todo.type";
import todoService from "~/services/todo.service";
import TodoAdd from "~/components/todo/todo-add";

import {
    createTodoAction as useCreateTodo,
    deleteTodoAction as useDeleteTodo,
    toggleTodoAction as useToggleTodo
} from "~/actions/todo.actions";

export { useCreateTodo, useToggleTodo, useDeleteTodo };

export const useInitTodos = routeLoader$<TodoInterface[]>(async () => {
  try {
    return await todoService.getAll();
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de récupérer les todos");
  }
});

export default component$(() => {
    const createTodoAction = useCreateTodo();
    const toggleTodoAction = useToggleTodo();
    const deleteTodoAction = useDeleteTodo();

    const showAddTodo = useSignal<boolean>(false);

  const todos = useInitTodos();

  const handleToggle = $(async (id: number, completed: boolean) => {
      await toggleTodoAction.submit({id, completed});
  });

  const handleDelete = $(async (id: number) => {
      await deleteTodoAction.submit({id});
  });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'c' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                showAddTodo.value = true;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    })

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div class="mb-8">
          <h1 class="mb-2 text-3xl font-bold text-gray-900">Mes Todos</h1>
          <p class="text-gray-600">Gérez vos tâches efficacement</p>
        </div>
        <TodoAdd
            showAddTodo={showAddTodo}
            createTodoAction={createTodoAction}
        />

        {/* Grille de cards */}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todos.value.map((todo) => (
            <TodoCard
              key={todo.id}
              data={todo}
              onDelete$={handleDelete}
              onToggle$={handleToggle}
            />
          ))}
        </div>

        {todos.value.length === 0 && (
          <div class="py-12 text-center">
            <div class="mb-4 text-6xl text-gray-400">📝</div>
            <h3 class="mb-2 text-lg font-medium text-gray-900">Aucun tâches</h3>
            <p class="text-gray-500">
              Commencez par créer votre premier tâches !
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
