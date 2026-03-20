import React from "react";
import { LogOut, CheckCircle, Moon, Sun } from "lucide-react";
import { initState } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Header = ({ darkMode, toggleDarkMode }) => {
  const dispatch = useDispatch();
  const onDisconnect = () => {
    dispatch(initState());
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0f172a]/70 border-b border-white/5 shadow-2xl"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 md:max-w-4xl">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-glow"></div>
              <div className="relative bg-[#0f172a] p-2 rounded-xl border border-white/10">
                <CheckCircle className="text-pink-400" size={24} strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              TaskPro
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={toggleDarkMode}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDisconnect}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/40 text-pink-300 hover:text-pink-100 transition-all font-semibold text-sm shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Déconnexion</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
