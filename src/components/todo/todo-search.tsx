import {$, component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {TodoInterface} from "~/types/todo.type";

export type TodoSearchProps = {
    todos: TodoInterface[];
    goToDetail$: (id: number) => void;
    unResearch$: () => void;
}

export default component$(({todos, goToDetail$, unResearch$}: TodoSearchProps) => {
    const results = useSignal<TodoInterface[]>([...todos]);

    const titleInputRef = useSignal<HTMLInputElement>();

    const handleSearch = $(async (e: KeyboardEvent) => {
        const value = (e.target as HTMLInputElement).value;
        results.value = todos.filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()));
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        if (titleInputRef.value) {
            setTimeout(() => {
                titleInputRef.value?.focus();
            }, 10);
        }
    },
        { strategy: 'intersection-observer' }
    );

    return (
        <>
            <div
                onClick$={unResearch$.bind(null)}
                class="bg-black/50 w-screen h-screen fixed z-40 top-0 left-0"
            ></div>
            <div
                class="fixed bg-white flex flex-col z-50 md:left-1/4 md:w-2/4 py-4 px-6 rounded-lg shadow-lg border border-gray-200 top-1/4"
            >
                <input
                    ref={titleInputRef}
                    type="text"
                    placeholder="Rechercher..."
                    onKeyUp$={e => handleSearch(e)}
                    tabIndex={1}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {
                    results.value.length > 0 && (
                        <div class="mt-4 space-y-4">
                            {results.value.map(todo => (
                                <div
                                    onClick$={goToDetail$.bind(null, todo.id)}
                                    key={todo.id}
                                    class="flex cursor-pointer items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span class="text-sm font-medium text-gray-900">{todo.title}</span>
                                    <span class="text-xs text-gray-500">{todo.content}</span>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
});