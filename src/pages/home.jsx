import { Header, TodoCreate, TodoFilter, TodoList } from "../components";
import SearchBar from "../components/SearchBar";
import CalendarHorizontal from "../components/CalendarHorizontal";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks, getFilter, getTask, getSearchQuery, getSelectedDate } from "../redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { getState } from "../redux/slices/authSlice";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  let tasks = useSelector(selectAllTasks);
  let auth = useSelector(getState);
  let { _id, name } = auth.connectedUser || {};
  let filter = useSelector(getFilter);
  let searchQuery = useSelector(getSearchQuery);
  let selectedDateStr = useSelector(getSelectedDate);

  const getLocalDateString = (date = new Date()) => {
    const offset = date.getTimezoneOffset();
    const adjusted = new Date(date.getTime() - (offset * 60 * 1000));
    return adjusted.toISOString().split('T')[0];
  };

  // Derive stats based on ALL tasks for the selected date, regardless of search/filter
  const tasksForSelectedDate = tasks.filter(task => {
    const dateToUse = task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt || Date.now());
    return getLocalDateString(dateToUse) === selectedDateStr;
  });

  const itemsLeft = tasksForSelectedDate.filter((task) => !task.isCompleted).length;
  const completedItems = tasksForSelectedDate.length - itemsLeft;
  const progress = tasksForSelectedDate.length === 0 ? 0 : Math.round((completedItems / tasksForSelectedDate.length) * 100);

  useEffect(() => {
    if (_id) dispatch(getTask(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredTasks = () => {
    let result = tasksForSelectedDate; // Start with date-filtered tasks

    // Filter by search
    if (searchQuery) {
        result = result.filter(task => task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by status
    switch (filter) {
      case "active":
        result = result.filter((task) => !task.isCompleted);
        break;
      case "completed":
        result = result.filter((task) => task.isCompleted);
        break;
    }
    
    return result;
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 text-slate-100 overflow-x-hidden relative selection:bg-pink-500/30 ${darkMode ? 'bg-[#0f172a]' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600'}`}>
      {/* Spectacular Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen transition-all duration-1000 ${darkMode ? 'bg-gradient-to-b from-indigo-600/20 to-purple-600/20' : 'bg-white/10'}`}></div>
        <div className={`absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen transition-all duration-1000 ${darkMode ? 'bg-gradient-to-tr from-pink-600/20 to-transparent' : 'bg-white/10'}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-screen animate-pulse-glow transition-all duration-1000 ${darkMode ? 'bg-gradient-to-br from-blue-600/10 to-fuchsia-600/10' : 'bg-white/20'}`}></div>
        
        {/* Subtle noise/grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCAwIDQwIDAgNDAgNDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-40"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2">
                Bonjour, {name?.split(' ')[0] || "Astronaute"} ✨
              </h2>
              <p className="text-white/70 text-base md:text-lg">
                Vous avez <span className="text-pink-300 font-bold">{itemsLeft}</span> tâche{itemsLeft !== 1 ? 's' : ''} en attente pour cette date.
              </p>
            </div>
            
            {/* Minimal Progress Bar */}
            {tasksForSelectedDate.length > 0 && (
              <div className="w-full md:w-48 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md shadow-lg">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-white/70 font-bold uppercase tracking-wider">Progression</span>
                  <span className="text-sm font-bold text-white">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* New UI Elements for Phase 6 */}
          <SearchBar darkMode={darkMode} />
          <CalendarHorizontal darkMode={darkMode} />

          <div className="space-y-8">
            <TodoCreate />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between flex-wrap gap-4 border-b border-white/20 pb-4 mb-4">
                 <TodoFilter itemsLeft={itemsLeft} />
              </div>
              
              <div className="min-h-[300px]">
                <TodoList tasks={filteredTasks()} />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
