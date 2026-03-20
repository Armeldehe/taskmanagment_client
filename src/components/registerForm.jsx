import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getState,
  register as createAccount,
  setStatusToIdle,
} from "../redux/slices/authSlice";
import Spinner from "./spinner";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { status, message } = useSelector(getState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = (data) => {
    dispatch(createAccount(data));
  };

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => {
        dispatch(setStatusToIdle());
      }, 6000);
    }
  }, [status, dispatch]);

  return (
    <div className="w-full">
      <AnimatePresence>
        {status === "failed" && message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
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
        
        {status === "success" && message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-bold">✓</span>
              </div>
              <p className="text-emerald-200/90 text-sm font-medium">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "loading" && (
        <div className="mb-6 flex justify-center">
          <Spinner />
        </div>
      )}

      <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-4">
        
        {/* Email Field */}
        <motion.div 
          className="relative w-full group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors duration-300">
            <Mail size={20} />
          </div>
          <input
            className="glass-input !pl-12"
            type="text"
            {...formRegister("email", {
              required: "L'email est obligatoire",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Format d'email invalide",
              },
            })}
            placeholder="Votre email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-pink-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>{errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Name Field */}
        <motion.div 
          className="relative w-full group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-purple-400 transition-colors duration-300">
            <User size={20} />
          </div>
          <input
            className="glass-input !pl-12"
            type="text"
            {...formRegister("name", {
              required: "Votre nom est requis",
              maxLength: {
                value: 15,
                message: "15 caractères maximum",
              },
            })}
            placeholder="Votre nom d'utilisateur"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-pink-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>{errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Password Field */}
        <motion.div 
          className="relative w-full group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-pink-400 transition-colors duration-300">
            <Lock size={20} />
          </div>
          <input
            className="glass-input !pl-12 !pr-[3.5rem]"
            type={showPwd ? "text" : "password"}
            {...formRegister("password", {
              required: "Le mot de passe est obligatoire",
              minLength: {
                value: 6,
                message: "6 caractères minimum",
              },
              maxLength: {
                value: 15,
                message: "15 caractères maximum",
              },
            })}
            placeholder="Votre mot de passe"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors focus:outline-none"
          >
            {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <AnimatePresence>
            {errors.password && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-pink-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>{errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="pt-2">
          <button
            type="submit"
            disabled={status === "loading" || Object.keys(errors).length > 0}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative flex items-center gap-2">
              <UserPlus size={18} />
              S'inscrire
            </span>
          </button>
        </motion.div>
        
        {/* Link to Login */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-center mt-5">
          <p className="text-white/60 text-sm">
            Vous avez déjà un compte ?{" "}
            <Link to="/security/login" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}

export default RegisterForm;
