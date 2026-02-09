import React, { forwardRef } from "react";
import { IconCheck, IconCross } from "./icons";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/slices/taskSlice";

const TodoListItem = ({ todo, ...props }) => {
  const { _id: id, description, completed } = todo;

  const dispatch = useDispatch();

  const handdleDelete = () => {
    dispatch(deleteTask(id));
  };

  const toggleTodo = (todo) => {
    const toggledTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTask(toggledTodo));
  };

  return (
    <article
      {...props}
      className="flex gap-4 p-4 md:p-5 hover:bg-white/5 transition-all duration-300 group last:border-b-0"
    >
      <button
        onClick={() => toggleTodo(todo)}
        type="button"
        className={`flex-shrink-0 h-7 w-7 rounded-full transition-all duration-300 transform cursor-pointer flex items-center justify-center ${
          completed
            ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/60 scale-110 ring-2 ring-green-300/50"
            : "border-3 border-blue-400/60 hover:border-blue-300 hover:bg-blue-500/20 group-hover:border-blue-400 group-hover:scale-110"
        }`}
        title={completed ? "Marquer comme incomplet" : "Marquer comme complété"}
      >
        {completed && (
          <i className="fas fa-check text-white text-sm font-bold"></i>
        )}
      </button>
      <p
        className={`flex-1 text-lg pt-0.5 transition-all duration-300 ${
          completed
            ? "text-white/40 line-through"
            : "text-white/80 group-hover:text-white"
        }`}
      >
        {description}
      </p>
      <button
        onClick={handdleDelete}
        className="flex-shrink-0 p-2.5 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-400 hover:text-red-200 transition-all duration-300 transform hover:scale-110 ring-2 ring-red-500/40 hover:ring-red-400/60 font-bold"
        title="Supprimer la tâche"
      >
        <i className="fas fa-trash-alt text-base"></i>
      </button>
    </article>
  );
};

export default TodoListItem;
