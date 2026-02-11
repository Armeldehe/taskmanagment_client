import { Header, TodoCreate, TodoFilter, TodoList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks, getFilter, getTask } from "../redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { getState } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  let tasks = useSelector(selectAllTasks);

  let {
    connectedUser: { _id },
  } = useSelector(getState);

  let filter = useSelector(getFilter);

  const itemsLeft = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    dispatch(getTask(_id));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filteredTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div
      className={`min-h-screen w-screen ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700"
      }`}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
        />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:max-w-4xl">
          <div className="space-y-6 animate-in fade-in duration-700">
            {/* Statistics Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-400/40 hover:border-blue-300/70 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300/80 text-sm font-medium">
                      Total de tâches
                    </p>
                    <p className="text-3xl font-bold text-blue-100 mt-2">
                      {tasks.length}
                    </p>
                  </div>
                  <div className="text-4xl opacity-60">📋</div>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-6 border border-emerald-400/40 hover:border-emerald-300/70 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300/80 text-sm font-medium">
                      Complétées
                    </p>
                    <p className="text-3xl font-bold text-green-100 mt-2">
                      {tasks.filter((t) => t.completed).length}
                    </p>
                  </div>
                  <div className="text-4xl opacity-60">✅</div>
                </div>
              </div>
              <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-6 border border-orange-400/40 hover:border-orange-300/70 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300/80 text-sm font-medium">
                      En cours
                    </p>
                    <p className="text-3xl font-bold text-orange-100 mt-2">
                      {itemsLeft}
                    </p>
                  </div>
                  <div className="text-4xl opacity-60">⏳</div>
                </div>
              </div>
            </div>

            {/* Create Task */}
            <div className="animate-in fade-in slide-in-from-bottom duration-700">
              <TodoCreate />
            </div>

            {/* Tasks Section */}
            {itemsLeft > 0 && (
              <div className="space-y-4 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-blue-300 text-2xl">🎯</span>
                    <span>Filtrer les tâches</span>
                  </h2>
                </div>
                <TodoFilter />
              </div>
            )}

            {/* Tasks List */}
            <div className="animate-in fade-in duration-700">
              {filteredTasks().length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-indigo-300 text-2xl">✅</span>
                      <span>Vos tâches</span>
                    </h2>
                    <span className="ml-auto bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/50">
                      {filteredTasks().length} tâche
                      {filteredTasks().length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <TodoList tasks={filteredTasks()} />
                </div>
              ) : (
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-12 border border-white/20 text-center">
                  <div className="text-5xl opacity-80 mb-4">📭</div>
                  <p className="text-white/70 text-lg">
                    Aucune tâche à afficher
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Créez une nouvelle tâche pour commencer
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
