import React, { useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { LuEye, LuEyeOff } from "react-icons/lu";
import "./Login.css";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/reset-password`,
        {
          resetPasswordToken,
          password: newPassword,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Actualizado",
          text: "La contraseña fue Actualizada correctamente",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la contraseña. Por favor, inténtelo de nuevo.",
        icon: "error",
      });
    }
  };

  return (
    <section className="min-h-screen min-w-full login-bg-img flex items-center justify-center">
      <div className="login-form w-[350px] md:w-[500px] lg:w-[929px] h-[495px] mx-auto my-2 bg-lightgray bg-opacity-60 p-5 lg:p-8 rounded-xl border border-slate-700">
        <div>
          <Link to="/forgot-password">
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
          className="my-5 mx-auto w-[90%] lg:w-[50%]"
        >
          <h2 className="text-center lg:text-left poppins-medium text-xl mb-8">
            Olvidé mi contraseña
          </h2>
          <div className="flex flex-col poppins-regular lg:w-[75%]">
            <label htmlFor="newPassword">
              <p className="font-medium text-slate-700">Nueva contraseña</p>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-3 border lg:w-[345px] bg-gray-100/75 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-3"
                  placeholder="**"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute pb-3 pr-3 lg:pr-0 inset-y-0 right-0 flex items-center focus:outline-none"
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
            </label>
            <label htmlFor="confirmPassword">
              <p className="font-medium text-slate-700">
                Repetir nueva contraseña
              </p>
              <div className="relative ">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-3 border lg:w-[345px] bg-gray-100/75 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-3"
                  placeholder="**"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute pb-3 pr-3 lg:pr-0 inset-y-0 right-0 flex items-center focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <LuEyeOff size={20} />
                  ) : (
                    <LuEye size={20} />
                  )}
                </button>
              </div>
            </label>
            <button
              type="submit"
              className="poppins-semibold lg:text-lg w-[40%] p-2 text-black bg-acento rounded-xl hover:shadow items-center justify-center mx-auto lg:mx-0 mt-14"
            >
              <p>Restablecer</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
