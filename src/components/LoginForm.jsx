import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isFormInvalid } from "../utils/isFormInvalide";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LoginForm() {
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, isAuthenticated } = useSelector((state) => state.authReducer);

  const onHandleSubmit = (data) => {
    dispatch(authenticate(data));
  };

  useEffect(() => {
    if (status === "success" && isAuthenticated) {
      navigate("/home");
    }
  }, [status, isAuthenticated, navigate]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-5">
        
        {/* Email Field */}
        <motion.div 
          className="relative w-full group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-pink-400 transition-colors duration-300">
            <Mail size={20} />
          </div>
          <input
            className="glass-input !pl-12"
            type="text"
            {...register("email", {
              required: "L'email est obligatoire",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Format d'email invalide",
              },
            })}
            placeholder="Votre adresse email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -5 }}
                className="text-pink-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1"
              >
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Password Field */}
        <motion.div 
          className="relative w-full group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-indigo-400 transition-colors duration-300">
            <Lock size={20} />
          </div>
          <input
            className="glass-input !pl-12 !pr-16"
            type={showPwd ? "text" : "password"}
            {...register("password", {
              required: "Le mot de passe est obligatoire",
              minLength: {
                value: 6,
                message: "6 caractères minimum requis",
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
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -5 }}
                className="text-pink-400 text-xs mt-1.5 ml-2 font-medium flex items-center gap-1"
              >
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="pt-2"
        >
          <button
            id="loginSubmit"
            type="submit"
            disabled={status === "loading" || isFormInvalid(errors)}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-500 hover:from-pink-600 to-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative flex items-center gap-2">
              Se connecter
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
        
        {/* Link to Register */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-white/60 text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link to="/security/register" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-300 hover:to-indigo-300 transition-all">
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}

export default LoginForm;
