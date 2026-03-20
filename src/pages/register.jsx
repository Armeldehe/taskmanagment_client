import React from "react";
import accountImg from "../assets/images/Account.png";
import RegisterForm from "../components/registerForm";
import { motion } from "framer-motion";

function Register() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Spectacular Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-600/20 to-blue-600/20 blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-purple-600/20 to-pink-600/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-[20%] left-[30%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-fuchsia-600/20 to-indigo-600/20 blur-[130px] animate-blob animation-delay-4000 mix-blend-screen"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCAwIDQwIDAgNDAgNDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md perspective-1000 my-8"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group">
          {/* Shine effect on container */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          
          <div className="flex flex-col justify-center items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="relative mb-5"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-70 animate-pulse-glow"></div>
              <div className="relative bg-[#0f172a] p-1 rounded-full border border-white/10 shadow-2xl">
                <img src={accountImg} alt="Logo" width="80" height="80" className="rounded-full bg-white/5 p-2" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 pb-1">
                Créer un compte
              </h1>
              <p className="text-white/60 text-sm mt-2 font-medium tracking-wide">
                Rejoignez le futur de la productivité
              </p>
            </motion.div>
          </div>
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          >
            <RegisterForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
