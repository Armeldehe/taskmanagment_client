import React from "react";
import { changeFilter, getFilter } from "../redux/slices/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { List, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const TodoFilter = ({ itemsLeft }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const filters = [
    { id: "all", label: "Toutes", icon: List },
    { id: "active", label: "En cours", icon: Clock },
    { id: "completed", label: "Terminées", icon: CheckCircle2 }
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl relative backdrop-blur-md">
        {filters.map((f) => {
          const isActive = filter === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => dispatch(changeFilter(f.id))}
              className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors z-10 ${
                isActive ? "text-white" : "text-white/40 hover:text-white/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden md:inline">{f.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Dynamic items left counter */}
      <motion.div 
        key={itemsLeft}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-semibold shadow-[0_0_10px_rgba(236,72,153,0.1)]"
      >
        <span className="text-white font-bold">{itemsLeft}</span> restante{itemsLeft !== 1 ? 's' : ''}
      </motion.div>
    </div>
  );
};

export default TodoFilter;
