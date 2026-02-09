import React from "react";
import accountImg from "../assets/images/Account.png";
import RegisterForm from "../components/registerForm";

function Register() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
          <div className="flex flex-col justify-center items-center text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
              <img
                src={accountImg}
                alt="Logo"
                width="100"
                height="100"
                className="relative rounded-full bg-white p-3"
              />
            </div>
            <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Créer un compte
            </h1>
            <p className="text-white/80 text-sm mt-3">
              Rejoignez notre plateforme de gestion de tâches
            </p>

            {/* Decorative elements */}
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
