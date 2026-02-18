import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ tasks }) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="divide-y divide-white/10">
        {tasks.map((todo) => (
          <TodoListItem todo={todo} key={todo._id} />
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-white/50">Aucune tâche dans cette catégorie</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
