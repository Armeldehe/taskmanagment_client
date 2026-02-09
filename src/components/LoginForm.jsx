import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isFormInvalid } from "../utils/isFormInvalide";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

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

  const handleClick = () => navigate("/security/register");

  const onHandleSubmit = (data) => {
    dispatch(authenticate(data));
    console.log("data", data);
  };

  useEffect(() => {
    if (status === "success" && isAuthenticated) {
      navigate("/home");
    }
  }, [status, isAuthenticated]);

  useEffect(() => {
    if (isFormInvalid(errors)) {
      document
        .getElementById("loginSubmit")
        .classList.add(["hover:cursor-not-allowed"]);
    } else {
      document
        .getElementById("loginSubmit")
        .classList.remove(["hover:cursor-not-allowed"]);
    }
  });

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="relative w-full">
            <input
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              type="text"
              name="email"
              {...register("email", {
                required: "l'Email est obligatoire!",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "l'Email est invalide",
                },
              })}
              placeholder="Votre email"
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
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              type={showPwd ? "text" : "password"}
              name="password"
              {...register("password", {
                required: "le mot de passe obligatoire.",
                minLength: {
                  value: 6,
                  message:
                    "le mot de passe doit comporter au moins 6 caracteres!!",
                },
              })}
              placeholder="Votre mot de passe"
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
                {" "}
                {errors.password.message}{" "}
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-300 text-xs mt-1 font-medium">
                {" "}
                {errors.password.message}{" "}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          <button
            type="submit"
            id="loginSubmit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-500/50 shadow-lg hover:shadow-xl"
          >
            Se Connecter
          </button>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-xs">Nouveau client?</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
          <Link
            to="/security/register"
            className="w-full text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg border border-white/30 transition-all duration-300 transform hover:scale-105"
          >
            Créer un compte
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
