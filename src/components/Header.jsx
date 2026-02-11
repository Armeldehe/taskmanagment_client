import React from "react";
import { IconMoon, IconSun } from "./icons";
import { initState } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Header = ({ darkMode, toggleDarkMode }) => {
  const dispatch = useDispatch();
  const onDisconnect = () => {
    dispatch(initState());
  };

  return (
    <header className="backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-6 md:max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-2 rounded-lg transform transition-transform duration-300 hover:scale-110">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TaskPro
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/50 hover:to-purple-500/50 border-2 border-blue-400/60 hover:border-blue-300 transition-all duration-300 transform hover:scale-110 text-white shadow-lg hover:shadow-blue-500/50"
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? (
                <IconSun fill="#FBBF24" />
              ) : (
                <IconMoon fill="#BFDBFE" />
              )}
            </button>

            <button
              type="button"
              onClick={onDisconnect}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 border-2 border-red-500/60 text-red-300 hover:text-red-100 transition-all duration-300 transform hover:scale-105 font-semibold text-sm shadow-lg hover:shadow-red-500/30"
            >
              <span className="text-lg">⎋</span>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
