import {$, component$, Slot, useSignal, useTask$, useVisibleTask$} from '@builder.io/qwik';
import {Link, useLocation, useNavigate} from '@builder.io/qwik-city';
import TodoSearch from "~/components/todo/todo-search";
import {TodoInterface} from "~/types/todo.type";
import {getTodos} from "~/server/todo.server";


export default component$(() => {
  const location = useLocation();
  const nav = useNavigate();
  const showSearchTodos = useSignal<boolean>(false);
  const todos = useSignal<TodoInterface[]>([]);

  useTask$(async () => {
    todos.value = await getTodos();
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'r' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        showSearchTodos.value = true;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  })

  const navigation = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/counter', label: 'Counter', icon: '🔢' },
    { href: '/todos', label: 'Todos', icon: '📝' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.url.pathname === '/';
    }
    return location.url.pathname.startsWith(href);
  };

  const goToDetail$ = $(async (id: number) => {
    showSearchTodos.value = false;
    await nav('/todos/' + id);
  });

  const unResearch$ = $(async () => {
    showSearchTodos.value = false;
  });

  return (
    <div class="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div class="flex items-center">
              <Link href="/" class="flex items-center gap-3 group">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span class="text-white font-bold text-lg">Q</span>
                </div>
                <div class="hidden sm:block">
                  <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    DEMO Qwik
                  </h1>
                  <p class="text-xs text-gray-500">Practice Qwik</p>
                </div>
              </Link>
            </div>

            {
              showSearchTodos.value && (
                <TodoSearch
                    todos={todos.value}
                    goToDetail$={goToDetail$}
                    unResearch$={unResearch$}
                />
              )
            }

            {/* Navigation Desktop */}
            <nav class="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  class={`
                    relative px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${isActiveLink(item.href)
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <span class="text-base">{item.icon}</span>
                  {item.label}
                  {isActiveLink(item.href) && (
                    <div class="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600" />
                  )}
                </Link>
              ))}
            </nav>

            <div class="hidden md:flex items-center gap-3">
              <button
                  onClick$={() => showSearchTodos.value = !showSearchTodos.value}
                  class="p-2 flex gap-1 items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-solid border border-dashed rounded-lg transition-all duration-200"
              >
                <span class="text-lg">🔍</span>
                <span>Rechercher (CMD + R)</span>
              </button>
              <div class="w-px h-6 bg-gray-200" />
              <button class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">U</span>
                </div>
                <span class="text-sm font-medium text-gray-700 hidden lg:block">User</span>
              </button>
            </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="flex-1 container mx-auto my-8 py-6 px-4 bg-white rounded-lg shadow-md">
        <Slot />
      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
                <span class="text-white font-bold text-xs">Q</span>
              </div>
              <span class="text-sm text-gray-600">© 2025 Qwik App. Tous droits réservés.</span>
            </div>
            <div class="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" class="hover:text-gray-700 transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" class="hover:text-gray-700 transition-colors duration-200">
                Conditions d'utilisation
              </a>
              <a href="#" class="hover:text-gray-700 transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});