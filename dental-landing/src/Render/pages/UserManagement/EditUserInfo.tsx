import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Platform/Navbar';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { token } from '../../../localStorage/token';

export const EditUserInfo = () => {
  const { id } = useParams();
  const [allowEdition, setAllowEdition] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((res) => {
        const user = res.data;
        for (const key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            setValue(key, user[key]);
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      Swal.fire({
        title: 'Guardado',
        text: 'Información del usuario guardada con éxito.',
        icon: 'success',
      });
      console.log('User information saved:', response.data);
    } catch (error) {
      console.error('Error saving: ', error);
      let text = 'Ocurrió un error al guardar la información.';
      let title = 'Error';
      if (error instanceof AxiosError) {
        if (error?.response?.status === 409) {
          title = 'Campo Repetido';
          text = error.response.data.message;
        }
      }
      Swal.fire({
        title,
        text,
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="mx-auto lg:ms-[200px] max-w-[1594px] mt-[150px]">
        <div className="flex items-center mb-6">
          <Link to="/users-management/users-list" className="me-16">
            <button className="flex items-center bg-transparent poppins-medium">
              <ChevronLeftIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
              Atrás
            </button>
          </Link>
        </div>
        <main className="w-[90%] max-w-[1594px] h-[740px] rounded-[35px] bg-lightgray border border-[#424242] py-[30px] px-[78px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center poppins-light text-[16px] space-y-4">
              <h1 className="poppins-semibold text-[33px] mb-5">
                Información del usuario
              </h1>
              <div className="w-[122px] h-[122px] rounded-full bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP34iSqZQyUhayGE4vjJnPqZJWfEDXq67Udg&s')] bg-no-repeat bg-center bg-cover"></div>
              <div className="flex flex-col">
                <label htmlFor="firstName">Nombre usuario</label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName', {
                    required: 'El nombre es obligatorio',
                  })}
                  className={`${
                    !allowEdition
                      ? 'usermanagement-input-style'
                      : 'usermanagement-input-style-allowed'
                  }`}
                  readOnly={!allowEdition}
                />
                {errors.firstName && (
                  <p className="text-red-500">
                    {String(errors.firstName.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Apellido Usuario</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName', {
                    required: 'El apellido es obligatorio',
                  })}
                  className={`${
                    !allowEdition
                      ? 'usermanagement-input-style'
                      : 'usermanagement-input-style-allowed'
                  }`}
                  readOnly={!allowEdition}
                />
                {errors.lastName && (
                  <p className="text-red-500">
                    {String(errors.lastName.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Formato de email inválido',
                    },
                  })}
                  className={`${
                    !allowEdition
                      ? 'usermanagement-input-style'
                      : 'usermanagement-input-style-allowed'
                  }`}
                  readOnly={!allowEdition}
                />
                {errors.email && (
                  <p className="text-red-500">{String(errors.email.message)}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="role_name">rol</label>
                <select
                  id="role_name"
                  {...register('role_name', {
                    required: 'El rol es obligatorio',
                  })}
                  className={`${
                    !allowEdition
                      ? 'usermanagement-input-style'
                      : 'usermanagement-input-style-allowed'
                  }`}
                  disabled={!allowEdition}>
                  <option value="OWNER">OWNER</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="ASSOCIATED">ASSOCIATED</option>
                </select>
                {errors.role_name && (
                  <p className="text-red-500">
                    {String(errors.role_name.message)}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
                  type="button"
                  onClick={() => setAllowEdition(!allowEdition)}>
                  {!allowEdition ? 'Activar Edición' : 'Desactivar Edición'}
                </button>
                {allowEdition && (
                  <button
                    className="bg-acento poppins-semibold ms-7 py-2 px-4 rounded-[8px]"
                    type="submit">
                    Guardar
                  </button>
                )}
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};
