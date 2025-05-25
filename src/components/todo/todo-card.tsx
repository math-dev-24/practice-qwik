import { component$ } from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import { TodoInterface } from "~/types/todo.type";

interface TodoCardProps {
  data: TodoInterface;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

export default component$<TodoCardProps>(({ data, onDelete, onToggle }) => {

  return (
    <div class={`
      group relative bg-white rounded-xl shadow-sm border border-gray-200 
      hover:shadow-md hover:border-gray-300 transition-all duration-200 
      overflow-hidden ${data.completed ? 'opacity-75' : ''}
    `}>
      {/* Status indicator */}
      <div class={`
        absolute top-0 left-0 w-1 h-full transition-all duration-200
        ${data.completed ? 'bg-green-500' : 'bg-blue-500'}
      `} />
      
      <div class="p-4 pl-6">
        {/* Header avec ID et status */}
        <div class="flex flex-col mb-3">
          <h3>{data.title}</h3>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              #{data.id}
            </span>
            <div class={`
              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${data.completed 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
              }
            `}>
              <span class={`w-2 h-2 rounded-full ${data.completed ? 'bg-green-500' : 'bg-blue-500'}`} />
              {data.completed ? 'Terminé' : 'En cours'}
            </div>
          </div>
          
          {/* Actions rapides */}

            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

                <button
                  onClick$={() => onToggle(data.id, !data.completed)}
                  class={`
                    p-1.5 rounded-lg transition-colors duration-200 text-xs font-medium
                    ${data.completed 
                      ? 'hover:bg-yellow-100 text-yellow-600 hover:text-yellow-700' 
                      : 'hover:bg-green-100 text-green-600 hover:text-green-700'
                    }
                  `}
                  title={data.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
                >
                  {data.completed ? '↺' : '✓'}
                </button>

                <button
                  onClick$={() => onDelete(data.id)}
                  class="p-1.5 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors duration-200 text-xs"
                  title="Supprimer"
                >
                  🗑
                </button>
            </div>
        </div>

        {/* Contenu principal */}
        <div class="space-y-3">
          <h3 class={`
            font-medium text-gray-900 leading-tight
            ${data.completed ? 'line-through text-gray-500' : ''}
          `}>
            {data.content}
          </h3>
          
          {/* Progress bar pour les todos en cours */}
          {!data.completed && (
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div class="bg-blue-500 h-1.5 rounded-full w-1/3 transition-all duration-300" />
            </div>
          )}
        </div>

        {/* Footer avec actions */}
        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <Link 
            href={`/todos/${data.id}`}
            class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center gap-1"
          >
            Voir détails
            <span class="text-xs">→</span>
          </Link>
          
          {/* Timestamps ou metadata */}
          <div class="text-xs text-gray-400">
            {data.completed ? (
              <span class="flex items-center gap-1">
                <span>✅</span>
                Terminé
              </span>
            ) : (
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                En cours
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Effet de hover */}
      <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none" />
    </div>
  );
});