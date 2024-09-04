import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import "./Login.css";
import { useLoginData } from "../../../hooks/useLoginData";
import { LoginFormInputs } from "../../../types/props/login.props";
import { GoBack } from "../../components/UI";

export const Login = () => {
  const { onLoginSubmit, togglePasswordVisibility, showPassword, loading } = useLoginData()
  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>();
  
  return (
    <section className="min-h-screen min-w-full login-bg-img flex items-center justify-center">
      <div className="login-form w-[350px] md:w-[500px] lg:w-[929px] h-[495px] mx-auto my-2 bg-lightgray bg-opacity-60 p-5 lg:p-8 rounded-xl border border-slate-700">
        {/* remove this button in the future if we won't need the landing page */}
        <GoBack path="/" titleGoBack="Atrás"/>
        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="my-5 mx-auto w-[90%] lg:w-[50%]"
        >
          <h2 className="text-center lg:text-left poppins-medium text-xl mb-8">
            Inicio de sesión
          </h2>
          <div className="flex flex-col poppins-regular">
            <label htmlFor="email">
              <p className="font-medium text-slate-700">Correo</p>
              <input
                id="email"
                type="email"
                {...register("email", { required: "El email es obligatorio" })}
                className="w-full py-3 border lg:w-[335px] bg-gray-100/75 rounded-lg px-3 border-[#424242] hover:shadow mb-3"
                placeholder="Ejemplo@gmail.com "
              />
              {errors.email && (
                <p className="text-red-500">{String(errors.email.message)}</p>
              )}
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 mt-3">Contraseña</p>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  className="w-full py-3 border lg:w-[335px] bg-gray-100/75 rounded-lg px-3 border-[#424242] hover:shadow mb-3"
                  placeholder="*******"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute pb-3 pr-3 lg:pr-28 inset-y-0 right-0 flex items-center focus:outline-none"
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">
                  {String(errors.password.message)}
                </p>
              )}
            </label>
            <div className="text-center lg:text-left mt-5">
              <Link
                to="/user/forgot-password"
                className="font-medium text-[#4053FF]"
              >
                Olvidé mi contraseña
              </Link>
            </div>
            <button
              type="submit"
              className="poppins-semibold text-lg w-[40%] lg:w-[30%] p-2 text-black bg-acento rounded-xl hover:shadow items-center justify-center mx-auto lg:mx-0 mt-8"
            >
              <span>{!loading ? "Continuar" : "Cargando..."}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
