import {$, component$, Signal} from "@builder.io/qwik";
import {Form} from "@builder.io/qwik-city";

export type TodoAddProps = {
    showAddTodo: Signal<boolean>;
    createTodoAction: any;
}

export default component$(({showAddTodo,createTodoAction}: TodoAddProps) => {

    const handleSubmit = $(async () => {
        showAddTodo.value = false;
    });

    return (
        <>
            <button
                onClick$={() => showAddTodo.value = !showAddTodo.value}
                class="p-2 my-2 bg-blue-500 w-full text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
                Ajouter (CMD + C)
            </button>

            {
                showAddTodo.value && (
                    <div
                        class="w-screen h-screen fixed top-0 z-50 left-0 bg-black/50 flex items-center justify-center"
                    >
                        <Form
                            class="flex flex-col gap-2 w-3/4 max-w-lg my-1 border p-4 rounded-lg border-gray-200 bg-white"
                            action={createTodoAction}
                            onSubmit$={handleSubmit}
                        >
                            <h2 class="text-lg font-bold text-gray-900 mt-2 mb-4">Ajouter une tâche</h2>
                            <input
                                type="text"
                                id="title-input"
                                name="title"
                                placeholder="Titre..."
                                tabIndex={1}
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <textarea
                                rows={2}
                                id="content"
                                name="content"
                                placeholder="Contenu..."
                                tabIndex={2}
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div class="flex items-center gap-2">
                                <button
                                    type="submit"
                                    tabIndex={3}
                                    class="p-2 bg-blue-500 w-full text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Ajouter
                                </button>
                                <button
                                    type="button"
                                    tabIndex={4}
                                    class="p-2 bg-yellow-200 w-full text-yellow-700 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                                    onClick$={() => showAddTodo.value = false}
                                >
                                    Annuler
                                </button>
                            </div>

                        </Form>
                    </div>
                )
            }
        </>
    );
});