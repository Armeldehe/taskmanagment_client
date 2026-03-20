import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import accountImg from '../assets/images/Account.png';
import { activate, getState } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';

function Activation() {
    let [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { IsOk, status, message } = useSelector(getState);

    useEffect(() => {
        if (id && token) {
            dispatch(activate({ userId: id, token }));
        }
    }, [id, token, dispatch]);

    return (
        <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Spectacular Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-600/20 to-blue-600/20 blur-[120px] animate-blob mix-blend-screen"></div>
                <div className="absolute -bottom-[20%] right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-pink-600/20 to-purple-600/20 blur-[130px] animate-blob animation-delay-2000 mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCAwIDQwIDAgNDAgNDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden text-center">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_infinite] pointer-events-none"></div>

                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="relative mx-auto w-24 h-24 mb-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-xl opacity-70 animate-pulse-glow"></div>
                        <div className="relative bg-[#0f172a] p-2 rounded-full border border-white/10 shadow-2xl h-full w-full flex items-center justify-center overflow-hidden">
                            <img src={accountImg} alt="Logo" className="w-16 h-16 object-contain drop-shadow-lg" />
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {status === "loading" ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <Loader2 size={40} className="text-indigo-400 animate-spin" />
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                                    Vérification en cours...
                                </h1>
                                <p className="text-white/50 text-sm">Veuillez patienter un instant.</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                {IsOk ? (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/30">
                                            <CheckCircle2 size={32} className="text-emerald-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white tracking-tight">Compte activé !</h1>
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 w-full mt-2">
                                            <p className="text-emerald-200/90 text-sm font-medium">{message}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-pink-500/30">
                                            <XCircle size={32} className="text-pink-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white tracking-tight">Oups !</h1>
                                        <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 w-full mt-2">
                                            <p className="text-pink-200/90 text-sm font-medium">{message || "Une erreur est survenue lors de l'activation."}</p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-10"
                    >
                        <Link 
                            to="/security/login" 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
                        >
                            <ArrowLeft size={18} className="text-indigo-400 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Retourner à la connexion</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Activation;