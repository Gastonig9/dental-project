import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import './Login.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login-user`,
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log('Login successful:', response.data);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.RoleObject) {
        localStorage.setItem(
          'RoleObject',
          JSON.stringify(response.data.RoleObject)
        );
      }
      login(response.data.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'verifica tus credenciales',
      });
    }
  };
  return (
    <section className="min-h-screen min-w-full login-bg-img flex items-center justify-center">
      <div className="login-form w-[350px] md:w-[500px] lg:w-[929px] h-[495px] mx-auto my-2 bg-lightgray bg-opacity-60 p-5 lg:p-8 rounded-xl border border-slate-700">
        <div>
          <Link to="/">
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
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 mx-auto w-[90%] lg:w-[50%]">
          <h2 className="text-center lg:text-left poppins-medium text-xl mb-8">
            Inicio de sesión
          </h2>
          <div className="flex flex-col poppins-regular">
            <label htmlFor="email">
              <p className="font-medium text-slate-700">Correo</p>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'El email es obligatorio' })}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Ejemplo@gmail.com "
              />
              {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 mt-3">Contraseña</p>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'La contraseña es obligatoria' })}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="*******"
              />
              {errors.password && <p className="text-red-500">{String(errors.password.message)}</p>}
            </label>
            <div className="text-center lg:text-left mt-5">
              <Link
                to="/user/forgot-password"
                className="font-medium text-[#4053FF]">
                Olvidé mi contraseña
              </Link>
            </div>
            <button
              type="submit"
              className="poppins-semibold text-lg w-[40%] lg:w-[30%] p-2 text-black bg-acento rounded-xl hover:shadow items-center justify-center mx-auto lg:mx-0 mt-8">
              <span>Continuar</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
