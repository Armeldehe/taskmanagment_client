import React from "react";
import TodoListItem from "./TodoListItem";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";

const TodoList = ({ tasks = [] }) => {
  return (
    <div className="w-full relative mt-4">
      {tasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-12 text-center"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <Inbox size={40} className="text-white/20" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent mb-2">
            Rien à l'horizon
          </h3>
          <p className="text-white/40 text-sm max-w-[250px]">
            Toutes vos tâches actuelles pérégrinent dans l'espace sidéral.
          </p>
        </motion.div>
      ) : (
        <motion.ul layout className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((todo) => (
              <TodoListItem todo={todo} key={todo._id} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
};

export default TodoList;
