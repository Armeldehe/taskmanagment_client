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

function RegisterForm() {
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { status, message } = useSelector(getState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const backToLogin = () => navigate("/security/login");

  const onHandleSubmit = (data) => {
    dispatch(createAccount(data));
  };

  useEffect(() => {
    if (["success", "failed"].includes(status)) {
      setTimeout(() => {
        dispatch(setStatusToIdle());
      }, 6000);
    }
    // navigate("/security/login")
  }, [status]);

  return (
    <div className="w-full">
      {status === "failed" && message && (
        <div className="mb-4 animate-in fade-in duration-500 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-100 text-sm font-medium">{message}</p>
        </div>
      )}
      {status === "success" && message && (
        <div className="mb-4 animate-in fade-in duration-500 bg-green-500/20 border border-green-500/50 rounded-lg p-3">
          <p className="text-green-100 text-sm font-medium">{message}</p>
        </div>
      )}
      {status === "loading" && (
        <div className="mb-4">
          <Spinner />
        </div>
      )}
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <div className="relative w-full">
            <input
              type="text"
              name="email"
              {...register("email", {
                required: "Email obligatore",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email invalide",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Email"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Veuillez entrer votre nom",
                maxLength: {
                  value: 15,
                  message: "Le nom doit tenir sur 15 caracteres maximum.",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Votre nom"
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.name.message}
              </p>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              {...register("password", {
                required: "entrez votre mot de passe",
                minLength: {
                  value: 6,
                  message: "le mot de passe doit avoir 6 caractères au moins",
                },
                maxLength: {
                  value: 15,
                  message: "le mot de passe doit avoir 15 caractères au plus",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            >
              <i className={`fa ${!showPwd ? "fa-eye" : "fa-eye-slash"} `}></i>
            </button>
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
            {errors.password && errors.password.type === "maxLength" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <input
              type={showPwd ? "text" : "password"}
              name="cpassword"
              {...register("cpassword", {
                required: "Confirmer le mot de passe!",
                validate: (value) => {
                  const { password } = getValues();
                  return (
                    password === value ||
                    "Les mots de passe doivent correspondre!"
                  );
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Confirmez le mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            >
              <i className={`fa ${!showPwd ? "fa-eye" : "fa-eye-slash"} `}></i>
            </button>
            {errors.cpassword && errors.cpassword.type === "required" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.cpassword.message}
              </p>
            )}
            {errors.cpassword && errors.cpassword.type === "validate" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {errors.cpassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg hover:shadow-xl"
          >
            S'inscrire
          </button>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-xs">
              Vous avez déjà un compte?
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
          <Link
            to="/security/login"
            className="w-full text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg border border-white/30 transition-all duration-300 transform hover:scale-105"
          >
            Retour au login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
