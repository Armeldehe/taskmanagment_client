import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/slices/taskSlice";
import { Trash2, Check, Calendar, Flag, Tag } from "lucide-react";
import { motion } from "framer-motion";

const TodoListItem = ({ todo }) => {
  const { _id: id, description, isCompleted, dueDate, priority, tags } = todo;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  const toggleTodo = () => {
    dispatch(updateTask({ ...todo, isCompleted: !isCompleted }));
  };

  const priorityConfig = {
    low: { color: "text-green-400 bg-green-400/10 border-green-400/20", label: "Basse" },
    medium: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", label: "Moyenne" },
    high: { color: "text-orange-400 bg-orange-400/10 border-orange-400/20", label: "Haute" },
    urgent: { color: "text-red-400 bg-red-400/10 border-red-400/30 shadow-[0_0_10px_rgba(248,113,113,0.3)]", label: "Urgent" },
  };

  // Helper to get relative date styling
  const getDateStyle = () => {
    if (!dueDate) return null;
    const taskDate = new Date(dueDate);
    const now = new Date();
    const timeDiff = taskDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (isCompleted) return "text-white/30 border-white/10";
    if (hoursDiff < 0) return "text-red-400 border-red-400/30 bg-red-400/10 animate-pulse"; // Overdue
    if (hoursDiff < 24) return "text-orange-400 border-orange-400/30 bg-orange-400/10"; // Due soon
    return "text-indigo-300 border-indigo-400/20 bg-indigo-500/10"; // Normal
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -50, filter: "blur(10px)" }}
      whileHover={{ scale: 1.01, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`group relative flex items-start sm:items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
        isCompleted 
        ? "bg-white/5 border-white/5 shadow-none" 
        : "glass-panel shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)] hover:border-indigo-500/30"
      }`}
    >
      {/* Decorative gradient strip for active tasks */}
      {!isCompleted && (
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-r-full shadow-[0_0_10px_rgba(236,72,153,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}

      {/* Custom Checkbox */}
      <button
        onClick={toggleTodo}
        type="button"
        className={`flex-shrink-0 mt-1 sm:mt-0 h-7 w-7 md:h-8 md:w-8 rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
          isCompleted
            ? "bg-gradient-to-tr from-emerald-400 to-teal-500 border-transparent shadow-[0_0_15px_rgba(52,211,153,0.5)] scale-110"
            : "border-white/20 hover:border-indigo-400 bg-white/5 hover:bg-indigo-500/20 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        }`}
        title={isCompleted ? "Marquer comme incomplet" : "Marquer comme complété"}
      >
        <motion.div
          initial={false}
          animate={{ scale: isCompleted ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check size={16} strokeWidth={3} className="text-white" />
        </motion.div>
      </button>

      {/* Task Content */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <p
          className={`text-base md:text-lg transition-all duration-500 truncate whitespace-normal ${
            isCompleted
              ? "text-white/30 line-through decoration-white/20"
              : "text-white/90 font-medium group-hover:text-white"
          }`}
        >
          {description}
        </p>

        {/* Badges Container */}
        <div className="flex flex-wrap gap-2 mt-1">
          {/* Due Date Badge */}
          {dueDate && (
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${getDateStyle()}`}>
              <Calendar size={12} />
              {new Date(dueDate).toLocaleString('fr-FR', {
                month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
              })}
            </span>
          )}

          {/* Priority Badge */}
          {priority && (
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border ${
              isCompleted ? "text-white/20 border-white/5 bg-transparent shadow-none" : priorityConfig[priority].color
            }`}>
              <Flag size={12} />
              {priorityConfig[priority].label}
            </span>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && tags.map((t, idx) => (
            <span key={idx} className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${
              isCompleted ? "text-white/20 border-white/5" : "text-pink-300 border-pink-400/20 bg-pink-500/10"
            }`}>
              <Tag size={10} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="flex-shrink-0 p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-transparent hover:border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] ml-2"
        title="Supprimer la tâche"
      >
        <Trash2 size={18} />
      </button>
    </motion.li>
  );
};

export default TodoListItem;
