import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/images/login.png";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { getState, setStatusToIdle } from "../redux/slices/authSlice";
import Spinner from "../components/spinner";

function Login() {
  let navigate = useNavigate();

  const handleClick = () => navigate("/security/register");

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
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
          <div className="flex flex-col justify-center items-center text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-75 animate-pulse"></div>
              <img
                src={login}
                alt="Logo"
                width="100"
                height="100"
                className="relative rounded-full bg-white p-3"
              />
            </div>
            <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Connexion
            </h1>
            <p className="text-white/80 text-sm mt-3">
              Accédez à votre compte de gestion de tâches
            </p>

            {/* Decorative elements */}
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            </div>
          </div>

          {status === "failed" && message && (
            <div className="mb-6 animate-in fade-in duration-500 bg-red-500/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <i className="fas fa-exclamation-circle text-red-400"></i>
                <p className="text-red-100 text-sm font-medium">{message}</p>
              </div>
            </div>
          )}
          {status === "loading" && (
            <div className="mb-4">
              <Spinner />
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
