import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.png";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getState, setStatusToIdle } from "../redux/slices/authSlice";
import Spinner from "../components/spinner";
import { motion } from "framer-motion";

function Login() {
  let navigate = useNavigate();
  const { status, message } = useSelector(getState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => {
        dispatch(setStatusToIdle());
      }, 4000);
    }
  }, [status]);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative selection:bg-pink-500/30">
      {/* Spectacular Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-b from-indigo-600/20 to-purple-600/20 blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-pink-600/20 to-fuchsia-600/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-t from-blue-600/20 to-cyan-600/20 blur-[130px] animate-blob animation-delay-4000 mix-blend-screen"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCAwIDQwIDAgNDAgNDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md perspective-1000"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group">
          {/* Shine effect on container */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          
          <div className="flex flex-col justify-center items-center text-center mb-10">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full blur-xl opacity-70 animate-pulse-glow"></div>
              <div className="relative bg-[#0f172a] p-1 rounded-full border border-white/10 shadow-2xl">
                <img src={loginImg} alt="Logo" width="90" height="90" className="rounded-full bg-white/5 p-3" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 pb-1">
                TaskPro
              </h1>
              <p className="text-white/60 text-sm mt-2 font-medium tracking-wide uppercase letter-spacing-2">
                Espace de connexion
              </p>
            </motion.div>
          </div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          >
            {status === "failed" && message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-red-400 font-bold">!</span>
                  </div>
                  <p className="text-red-200/90 text-sm font-medium">{message}</p>
                </div>
              </motion.div>
            )}
            
            {status === "loading" && (
              <div className="mb-6 flex justify-center">
                <Spinner />
              </div>
            )}
            
            <LoginForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
