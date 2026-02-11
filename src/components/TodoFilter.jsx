import React from "react";
import { changeFilter, getFilter } from "../redux/slices/taskSlice";
import { useSelector, useDispatch } from "react-redux";

const TodoFilter = () => {
  const dispatch = useDispatch();

  let filter = useSelector(getFilter);

  const updateFilter = (filter) => {
    dispatch(changeFilter(filter));
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-xl p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => updateFilter("all")}
          type="button"
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            filter === "all"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
          }`}
        >
          <span>📋</span>
          <span>Toutes</span>
        </button>
        <button
          onClick={() => updateFilter("active")}
          type="button"
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            filter === "active"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
          }`}
        >
          <span>⏳</span>
          <span>En cours</span>
        </button>
        <button
          onClick={() => updateFilter("completed")}
          type="button"
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            filter == "completed"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
          }`}
        >
          <span>✅</span>
          <span>Complétées</span>
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
