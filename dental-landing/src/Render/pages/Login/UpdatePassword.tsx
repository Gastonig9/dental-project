import React, { useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/reset-password?token=${resetPasswordToken}`,
        {
          resetPasswordToken,
          password: newPassword,
        }
      );
      if (response.status === 200) {
        setMessage("Contraseña actualizada correctamente.");
      }
    } catch (error) {
      setMessage(
        "No se pudo actualizar la contraseña. Por favor, inténtelo de nuevo."
      );
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
            Inicio de sesión
          </h2>
          <div className="flex flex-col poppins-regular">
            <label htmlFor="newPassword">
              <p className="font-medium text-slate-700">Nueva contraseña</p>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-3"
                placeholder="******"
              />
            </label>
            <label htmlFor="confirmPassword">
              <p className="font-medium text-slate-700">
                Repetir nueva contraseña
              </p>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-8"
                placeholder="******"
              />
            </label>
            <div className="text-center lg:text-left">
              {message && (
                <p className="text-center text-green-500">{message}</p>
              )}
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

export default UpdatePassword;
