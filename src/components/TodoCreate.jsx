import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/slices/taskSlice";
import { getState } from "../redux/slices/authSlice";

const TodoCreate = () => {
  const [desc, setDesc] = useState("");

  const {
    connectedUser: { _id },
  } = useSelector(getState);

  const dispatch = useDispatch();

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let titre = desc;
    setDesc("");
    if (_id) {
      dispatch(createTask({ description: titre.trim(), owner: _id }));
    }
  };

  return (
    <form
      onSubmit={handleCreateTodo}
      className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-xl p-4 md:p-6 transition-all duration-300 hover:border-white/40 hover:shadow-lg shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
          <i className="fas fa-plus"></i>
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-lg font-medium"
          placeholder="Ajouter une nouvelle tâche..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          disabled={!desc.trim()}
          className="flex-shrink-0 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </form>
  );
};

export default TodoCreate;
