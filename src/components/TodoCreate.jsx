import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/slices/taskSlice";
import { getState } from "../redux/slices/authSlice";
import { Plus, X, Calendar, Flag, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TodoCreate = () => {
  const [desc, setDesc] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");
  
  const { connectedUser: { _id } } = useSelector(getState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (desc.trim().length > 0) setIsExpanded(true);
    else setIsExpanded(false);
  }, [desc]);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let titre = desc.trim();
    if (titre && _id) {
      const taskPayload = { 
        description: titre, 
        owner: _id,
        priority
      };
      
      if (dueDate) taskPayload.dueDate = new Date(dueDate).toISOString();
      if (tags.trim()) {
        taskPayload.tags = tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
      }

      dispatch(createTask(taskPayload));
      
      // Reset
      setDesc("");
      setDueDate("");
      setPriority("medium");
      setTags("");
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    low: "text-green-400 bg-green-400/10 border-green-400/20",
    medium: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    high: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    urgent: "text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_10px_rgba(248,113,113,0.3)]",
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleCreateTodo}
      className="relative group mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative glass-panel rounded-3xl overflow-hidden flex flex-col">
        {/* Animated highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>

        {/* Top Input Area */}
        <div className="p-3 md:p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <Plus size={24} className="group-focus-within:rotate-90 transition-transform duration-300" />
          </div>
          
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base md:text-lg font-medium px-2 z-10"
            placeholder="Ajouter une nouvelle tâche cosmique..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          
          <AnimatePresence>
            {desc.trim() && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                type="button"
                onClick={() => setDesc("")}
                className="flex-shrink-0 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Effacer le texte"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!desc.trim()}
            className="flex-shrink-0 px-5 py-2.5 md:py-3 rounded-xl bg-white text-[#0f172a] font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all hidden md:block"
          >
            Créer
          </motion.button>
        </div>

        {/* Expanded Area for Advanced Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 md:px-6 md:pb-6 border-t border-white/5 pt-4 flex flex-col md:flex-row gap-4"
            >
              {/* Due Date */}
              <div className="flex-1 group/field">
                <label className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold tracking-wider mb-2">
                  <Calendar size={14} className="group-focus-within/field:text-pink-400 transition-colors" /> Échéance
                </label>
                <input 
                  type="datetime-local" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white/80 outline-none focus:border-pink-500/50 transition-colors text-sm [color-scheme:dark]"
                />
              </div>

              {/* Priority */}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold tracking-wider mb-2">
                  <Flag size={14} /> Priorité
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high', 'urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg border transition-all ${
                        priority === p ? priorityColors[p] : 'text-white/40 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      {p === 'low' ? 'Basse' : p === 'medium' ? 'Moyen' : p === 'high' ? 'Haute' : 'Urgent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex-1 group/field">
                <label className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold tracking-wider mb-2">
                  <Tag size={14} className="group-focus-within/field:text-indigo-400 transition-colors" /> Tags (séparés par ,)
                </label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ex: Travail, Urgent..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-colors text-sm"
                />
              </div>

              {/* Mobile Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!desc.trim()}
                className="mt-2 w-full py-3 rounded-xl bg-white text-[#0f172a] font-bold shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all md:hidden"
              >
                Créer la tâche
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.form>
  );
};

export default TodoCreate;
