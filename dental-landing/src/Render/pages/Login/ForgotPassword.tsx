import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import "./Login.css";
import { FiAlertCircle } from "react-icons/fi";
import Swal from "sweetalert2";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/request-reset-password`,
        {
          email,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Enviado",
          text: "Se ha enviado un correo con las instrucciones para restablecer la contraseña.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al enviar correo:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el correo, por favor intente de nuevo.",
        icon: "error",
      });
    }
  };

  return (
    <section className="min-h-screen min-w-full login-bg-img flex items-center justify-center">
      <div className="login-form w-[350px] md:w-[500px] lg:w-[929px] h-[495px] mx-auto my-2 bg-lightgray bg-opacity-60 p-5 lg:p-8 rounded-xl border border-slate-700">
        <div>
          <Link to="/login">
            <button className="flex items-center bg-transparent poppins-medium">
              <ChevronLeftIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
              Atrás
            </button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="my-10 mx-auto w-[90%] lg:ml-[25%] lg:w-[65%]"
        >
          <h2 className="text-center lg:text-left poppins-medium text-xl mb-8">
            Verificación de correo
          </h2>
          <div className="flex flex-col poppins-regular">
            <label htmlFor="email">
              <p className="font-medium text-slate-700">Correo</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 border lg:w-[335px] bg-gray-100/75 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#424242] hover:shadow mb-3"
                placeholder="Ejemplo@gmail.com "
                required
              />
            </label>
            <div className="flex poppins-regular leading-[100%] text-[14px]">
              <span>
                <FiAlertCircle className="h-[20px] w-[20px]" />
              </span>
              <p className="ml-1">
                De no estar registrado el mail utilizado en nuestra base de
                datos, el formulario para reestablecer su contraseña, no será
                enviado.
              </p>
            </div>
            <button
              type="submit"
              className="poppins-semibold text-lg w-[40%] lg:w-[30%] p-2 text-black bg-acento rounded-xl hover:shadow items-center justify-center mx-auto lg:mx-0 mt-14"
            >
              <span>Continuar</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
