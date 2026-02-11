import React from "react";
import { Outlet } from "react-router-dom";

export const SecuritySpace = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Arrière-plan animé, cohérent avec login / register */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Carte centrale contenant le texte et le contenu des formulaires */}
      <div className="relative z-10 flex w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Colonne gauche (texte de présentation) */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 p-10 text-center text-white">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Gestion des tâches</h1>
            <p className="text-sm font-light">Espace de sécurité</p>
          </div>
        </div>

        {/* Colonne droite : outlet pour login / register */}
        <div className="flex flex-1 items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
