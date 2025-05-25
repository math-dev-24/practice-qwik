import {$, component$, useSignal} from '@builder.io/qwik';
import { routeLoader$, Link } from '@builder.io/qwik-city';
import { TodoInterface } from '~/types/todo.type';
import {todoService} from "~/services/todo.service";

type TodoResult = {
  status: 'success';
  data: TodoInterface;
} | {
  status: 'error';
  message: string;
};

import {
  toggleTodoAction as useToggleTodo,
    updateTodoAction as useUpdateTodo,
} from "~/actions/todo.actions";

export {useToggleTodo };


export const useTodoDetail = routeLoader$<TodoResult>( 
  async ({params}) => {
    const id = parseInt(params.id);
    try {
      const todo: TodoInterface | null = await todoService.getById(id);

      if (!todo) {
        return {
          status: 'error',
          message: 'Todo non trouvé'
        };
      }

      return {
        status: 'success',
        data: todo
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: 'Erreur lors du chargement: ' + error
      };
    }
  }
);


export default component$(() => {
  const result = useTodoDetail();

  const toggleTodoAction = useToggleTodo();
  const updateTodoAction = useUpdateTodo();

  const isEditing = useSignal<boolean>(false);
  const editContent = useSignal<string>('');

  const handleUpdate = $(async (id: number, title: string, content: string, completed: boolean) => {
    console.log('🔄 handleUpdate appelé avec:', id, title, content, completed);

    // Vérifiez que updateTodoAction existe
    console.log('🔍 updateTodoAction:', updateTodoAction);
    console.log('🔍 updateTodoAction.submit:', updateTodoAction.submit);

    try {
      console.log('🔄 Avant submit');
      const result = await updateTodoAction.submit({id, title, content, completed});
      console.log('🔄 Après submit, résultat:', result);
    } catch (error) {
      console.error('❌ Erreur dans handleUpdate:', error);
    }

    isEditing.value = false;
  });

  const handleToggle = $(async (id: number, completed: boolean) => {
    console.log('🔄 handleToggle appelé avec:', id,completed);
    await toggleTodoAction.submit({id, completed});
  });


  // pas de tâche || erreur
  if (result.value.status === 'error') {
    return (
      <div class="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">❌</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p class="text-red-600 mb-6">{result.value.message}</p>
          <Link 
            href="/todos" 
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            ← Retour aux todos
          </Link>
        </div>
      </div>
    );
  }

  const todo = result.value.data;

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header avec navigation */}
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <Link 
              href="/todos" 
              class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <span class="mr-2">←</span>
              Retour aux todos
            </Link>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Tâche #{todo.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* En-tête de la card */}
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span class="text-2xl">{todo.completed ? '✅' : '📝'}</span>
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-white mb-1">{todo.title}</h1>
                  <div class={`
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                    ${todo.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }
                  `}>
                    <span class={`w-2 h-2 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {todo.completed ? 'Terminé' : 'En cours'}
                  </div>
                </div>
              </div>
              
              {/* Actions rapides */}
              <div class="flex items-center gap-2">
                <button
                    onClick$={() => {
                      if (!isEditing.value) {
                        editContent.value = todo.content;
                      }
                      isEditing.value = !isEditing.value;
                    }}
                  class="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
                >
                  {isEditing.value ? 'Annuler' : 'Modifier'}
                </button>
                <button
                    onClick$={() => handleToggle(todo.id, !todo.completed)}
                    class="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm font-medium"
                >
                  {todo.completed ? 'Marquer non terminé' : 'Marquer terminé'}
                </button>
              </div>
            </div>
          </div>

          {/* Corps principal */}
          <div class="p-8">
            {/* Section contenu */}
            <div class="mb-8">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">Contenu</h2>
                <span class="text-sm text-gray-500">ID: #{todo.id}</span>
              </div>
              
              {isEditing.value ? (
                <div class="space-y-4">
                  <textarea
                    value={editContent.value}
                    onInput$={(e) => editContent.value = (e.target as HTMLTextAreaElement).value}
                    class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Contenu du todo..."
                  />
                  <div class="flex items-center gap-3">
                    <button
                        onClick$={() => handleUpdate(todo.id, todo.title, editContent.value, todo.completed)}
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick$={() => isEditing.value = false}
                      class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div class="bg-gray-50 rounded-xl p-6">
                  <p class={`text-lg leading-relaxed ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {todo.content}
                  </p>
                </div>
              )}
            </div>

            {/* Statistiques et métadonnées */}
            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-blue-500 hover:outline-blue-500 hover:outline rounded-lg flex items-center justify-center">
                    <span class="text-white text-sm font-bold">#</span>
                  </div>
                  <h3 class="font-semibold text-gray-900">Identifiant</h3>
                </div>
                <p class="text-2xl font-bold text-blue-600">#{todo.id}</p>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span class="text-white text-sm">✓</span>
                  </div>
                  <h3 class="font-semibold text-gray-900">Statut</h3>
                </div>
                <p class="text-lg font-bold text-green-600">
                  {todo.completed ? 'Terminé' : 'En cours'}
                </p>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span class="text-white text-sm">📊</span>
                  </div>
                  <h3 class="font-semibold text-gray-900">Progression</h3>
                </div>
                <div class="space-y-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class={`h-2 rounded-full transition-all duration-500 ${todo.completed ? 'w-full bg-green-500' : 'w-1/3 bg-purple-500'}`} />
                  </div>
                  <p class="text-sm text-gray-600">{todo.completed ? '100%' : '33%'} complété</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section recommandations */}
        <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions suggérées</h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/todos" 
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">📋</span>
                <div>
                  <p class="font-medium text-gray-900">Voir tous les todos</p>
                  <p class="text-sm text-gray-500">Retour à la liste</p>
                </div>
              </div>
            </Link>
            
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
              <div class="flex items-center gap-3">
                <span class="text-2xl">➕</span>
                <div>
                  <p class="font-medium text-gray-900">Créer un nouveau</p>
                  <p class="text-sm text-gray-500">Ajouter un Tâches</p>
                </div>
              </div>
            </button>
            
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
              <div class="flex items-center gap-3">
                <span class="text-2xl">📊</span>
                <div>
                  <p class="font-medium text-gray-900">Voir les stats</p>
                  <p class="text-sm text-gray-500">Analyse des todos</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});