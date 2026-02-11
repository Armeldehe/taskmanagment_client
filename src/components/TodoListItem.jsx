import React from "react";
import { IconCross } from "./icons";
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
        className={`flex-shrink-0 h-8 w-8 rounded-full transition-all duration-300 transform cursor-pointer flex items-center justify-center border ${
          completed
            ? "bg-gradient-to-r from-emerald-400 to-green-500 border-transparent shadow-lg shadow-emerald-500/60 scale-110"
            : "border-blue-300 bg-blue-500/10 hover:bg-blue-500/25 group-hover:border-blue-200 group-hover:scale-110"
        }`}
        title={completed ? "Marquer comme incomplet" : "Marquer comme complété"}
      >
        <span
          className={`text-sm font-bold ${
            completed ? "text-white" : "text-blue-200"
          }`}
        >
          ✓
        </span>
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
        className="flex-shrink-0 p-2.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-all duration-300 transform hover:scale-110 shadow-md shadow-red-500/40"
        title="Supprimer la tâche"
      >
        <IconCross fill="#FECACA" />
      </button>
    </article>
  );
};

export default TodoListItem;
