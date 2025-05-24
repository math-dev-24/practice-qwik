// Dans votre page todos/index.tsx
import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import TodoCard from "~/components/todo/todo-card";
import { getAllTodos } from "~/server/api/todo";
import type { TodoInterface } from "~/types/todo.type";

export const useListTodos = routeLoader$<TodoInterface[]>(async () => {
  return await getAllTodos();
});

export default component$(() => {
  const todos = useListTodos();
  const todosState = useSignal(todos.value);

  const handleToggle$ = $((id: number) => {
    console.log("Toggle todo:", id);
    todosState.value = todosState.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
  });

  const handleDelete$ = $((id: number) => {
    console.log("Delete todo:", id);
    todosState.value = todosState.value.filter((todo) => todo.id !== id);
  });

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="mb-2 text-3xl font-bold text-gray-900">Mes Todos</h1>
          <p class="text-gray-600">Gérez vos tâches efficacement</p>
        </div>

        {/* Grille de cards */}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todosState.value.map((todo) => (
            <TodoCard
              key={todo.id}
              data={todo}
              onToggle$={handleToggle$}
              onDelete$={handleDelete$}
            />
          ))}
        </div>

        {todos.value.length === 0 && (
          <div class="py-12 text-center">
            <div class="mb-4 text-6xl text-gray-400">📝</div>
            <h3 class="mb-2 text-lg font-medium text-gray-900">Aucun todo</h3>
            <p class="text-gray-500">
              Commencez par créer votre premier todo !
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
