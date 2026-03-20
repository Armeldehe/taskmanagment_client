import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchQuery, setSearchQuery, selectAllTasks, setSelectedDate } from '../redux/slices/taskSlice';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ darkMode }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const allTasks = useSelector(selectAllTasks);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter tasks for suggestions
  const suggestions = searchQuery.trim().length >= 2 
    ? allTasks.filter(task => 
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Limit to 5 suggestions
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (task) => {
    const taskDate = task.dueDate || task.createdAt;
    const dateStr = new Date(taskDate).toISOString().split('T')[0];
    
    dispatch(setSelectedDate(dateStr));
    dispatch(setSearchQuery(task.description));
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-8 z-50" ref={dropdownRef}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${darkMode ? 'text-white/40 group-focus-within:text-pink-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            setShowDropdown(true);
          }}
          placeholder="Rechercher une tâche..."
          className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border backdrop-blur-md outline-none transition-all duration-300 font-medium ${
            darkMode 
              ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:border-pink-500/50 focus:shadow-[0_0_25px_rgba(244,114,182,0.15)]' 
              : 'bg-white/70 border-indigo-100 text-slate-800 placeholder-slate-400 shadow-sm focus:bg-white focus:border-indigo-400 focus:shadow-md'
          }`}
        />

        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                dispatch(setSearchQuery(''));
                setShowDropdown(false);
              }}
              className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors focus:outline-none ${darkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <X size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showDropdown && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden ${
              darkMode ? 'bg-slate-900/80 border-white/10 shadow-black/50' : 'bg-white/90 border-indigo-100 shadow-indigo-200/50'
            }`}
          >
            <div className={`px-3 py-1.5 mb-1 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
              Suggestions de tâches
            </div>
            <div className="flex flex-col gap-1">
              {suggestions.map((task) => (
                <button
                  key={task._id}
                  onClick={() => handleSelectSuggestion(task)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group/item ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-indigo-50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    darkMode ? 'bg-white/5 text-pink-400 group-hover/item:bg-pink-500/20' : 'bg-indigo-50 text-indigo-600 group-hover/item:bg-indigo-100'
                  }`}>
                    <CalendarIcon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold truncate ${darkMode ? 'text-white/90 shadow-sm' : 'text-slate-800'}`}>
                      {task.description}
                    </div>
                    <div className={`text-[10px] flex items-center gap-1 mt-0.5 ${darkMode ? 'text-white/40' : 'text-slate-500'}`}>
                      <Clock size={10} />
                      {new Date(task.dueDate || task.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long'
                      })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
