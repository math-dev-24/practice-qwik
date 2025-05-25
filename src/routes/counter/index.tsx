import { component$, useStore, useSignal, $ } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({
    count: 0,
    isVisible: true,
    history: [] as number[],
    target: 10
  });

  const isAnimating = useSignal(false);
  const showHistory = useSignal(false);

  const increment = $(() => {
    isAnimating.value = true;
    store.history.push(store.count);
    store.count++;
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  });

  const decrement = $(() => {
    if (store.count > 0) {
      isAnimating.value = true;
      store.history.push(store.count);
      store.count--;
      setTimeout(() => {
        isAnimating.value = false;
      }, 300);
    }
  });

  const reset = $(() => {
    store.history.push(store.count);
    store.count = 0;
  });

  const setTarget = $((value: number) => {
    store.target = value;
  });

  const progress = store.target > 0 ? Math.min((store.count / store.target) * 100, 100) : 0;
  const isCompleted = store.count >= store.target && store.target > 0;

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Counter Card */}
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          {/* Header avec objectif */}
          <div class="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div class="flex items-center justify-between text-white">
              <div>
                <h2 class="text-lg font-semibold">Compteur Principal</h2>
                <p class="text-purple-100 text-sm">Objectif: {store.target}</p>
              </div>
              <div class="flex items-center gap-2">
                {isCompleted && (
                  <div class="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <span>🎉</span>
                    <span class="text-sm font-medium">Objectif atteint!</span>
                  </div>
                )}
                <button
                  onClick$={() => store.isVisible = !store.isVisible}
                  class="p-2 bg-white/20 cursor-pointer rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  {store.isVisible ? '👁️' : '🙈'}
                </button>
              </div>
            </div>
          </div>

          {/* Counter Display */}
          <div class="p-8">
            {store.isVisible && (
              <div class="text-center mb-8">
                <div class={`
                  inline-flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold transition-all duration-300
                  ${isAnimating.value ? 'scale-110 shadow-lg' : 'scale-100'}
                  ${isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600'}
                `}>
                  {store.count}
                </div>
                
                {/* Progress Bar */}
                {store.target > 0 && (
                  <div class="mt-6 max-w-md mx-auto">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progression</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        class={`h-3 rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-r from-purple-500 to-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Controls */}
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick$={decrement}
                disabled={store.count <= 0}
                class="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span class="flex items-center gap-2">
                  <span class="text-2xl">−</span>
                  Décrémenter
                </span>
              </button>

              <div class="flex flex-col items-center gap-2">
                <div class="text-sm text-gray-500">Valeur actuelle</div>
                <div class="text-2xl font-bold text-gray-900">{store.count}</div>
              </div>

              <button
                onClick$={increment}
                class="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span class="flex items-center gap-2">
                  <span class="text-2xl">+</span>
                  Incrémenter
                </span>
              </button>
            </div>

            {/* Quick Actions */}
            <div class="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick$={() => { store.count += 5; }}
                class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
              >
                +5
              </button>
              <button
                onClick$={() => { store.count += 10; }}
                class="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
              >
                +10
              </button>
              <button
                onClick$={reset}
                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                Reset
              </button>
              <button
                onClick$={() => { store.count = store.target; }}
                class="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors duration-200 text-sm font-medium"
              >
                → Objectif
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div class="grid md:grid-cols-3 gap-6 mb-6">
          {/* Statistics */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-sm">📊</span>
              </div>
              <h3 class="font-semibold text-gray-900">Statistiques</h3>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Valeur actuelle:</span>
                <span class="font-semibold">{store.count}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Objectif:</span>
                <span class="font-semibold">{store.target}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Progression:</span>
                <span class="font-semibold">{Math.round(progress)}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Actions:</span>
                <span class="font-semibold">{store.history.length}</span>
              </div>
            </div>
          </div>

          {/* Target Setting */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span class="text-white text-sm">🎯</span>
              </div>
              <h3 class="font-semibold text-gray-900">Objectif</h3>
            </div>
            <div class="space-y-3">
              <input
                type="number"
                value={store.target}
                onInput$={(e) => setTarget(parseInt((e.target as HTMLInputElement).value) || 0)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nouvel objectif..."
              />
              <div class="flex gap-2">
                <button
                  onClick$={() => setTarget(25)}
                  class="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  25
                </button>
                <button
                  onClick$={() => setTarget(50)}
                  class="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  50
                </button>
                <button
                  onClick$={() => setTarget(100)}
                  class="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  100
                </button>
              </div>
            </div>
          </div>

          {/* History */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📝</span>
                </div>
                <h3 class="font-semibold text-gray-900">Historique</h3>
              </div>
              <button
                onClick$={() => showHistory.value = !showHistory.value}
                class="text-sm text-blue-600 hover:text-blue-700"
              >
                {showHistory.value ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            
            {showHistory.value ? (
              <div class="space-y-2 max-h-32 overflow-y-auto">
                {store.history.length === 0 ? (
                  <p class="text-gray-500 text-sm">Aucune action encore</p>
                ) : (
                  store.history.slice(-5).reverse().map((value, index) => (
                    <div key={index} class="flex justify-between text-sm py-1">
                      <span class="text-gray-600">Valeur #{store.history.length - index}:</span>
                      <span class="font-medium">{value}</span>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div class="text-center text-gray-500">
                <div class="text-2xl mb-1">{store.history.length}</div>
                <div class="text-sm">Actions effectuées</div>
              </div>
            )}
          </div>
        </div>

        {/* Achievement */}
        {isCompleted && (
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
            <div class="text-4xl mb-2">🎉</div>
            <h3 class="text-lg font-semibold text-green-800 mb-1">Félicitations!</h3>
            <p class="text-green-600">Vous avez atteint votre objectif de {store.target}!</p>
          </div>
        )}
      </div>
    </div>
  );
});