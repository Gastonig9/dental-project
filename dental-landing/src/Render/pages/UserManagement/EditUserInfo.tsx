import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Platform/Navbar';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

export const EditUserInfo = () => {
  const { id } = useParams();
  const [allowEdition, setAllowEdition] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${id}`)
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
        data
      );
      Swal.fire({
        title: 'Guardado',
        text: 'Información del usuario guardada con éxito.',
        icon: 'success',
      });
      console.log('User information saved:', response.data);
    } catch (error) {
      console.error('Error saving: ', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar la información.',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="mx-auto lg:ms-[200px] max-w-[1594px] mt-[150px]">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="me-16">
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
                <label htmlFor="name">Nombre usuario</label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`usermanagement-input-style ${
                    !allowEdition ? 'bg-white' : ''
                  }`}
                  readOnly={!allowEdition}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Apellido Usuario</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className={`usermanagement-input-style ${
                    !allowEdition ? 'bg-white' : ''
                  }`}
                  readOnly={!allowEdition}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  {...register('email')}
                  className={`usermanagement-input-style ${
                    !allowEdition ? 'bg-white' : ''
                  }`}
                  readOnly={!allowEdition}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="rol_name">rol</label>
                <select
                  id="rol_name"
                  {...register('rol_name')}
                  className={`usermanagement-input-select-style ${
                    !allowEdition ? 'bg-white' : ''
                  }`}
                  disabled={!allowEdition}>
                  <option value="">Seleccione un rol</option>
                  <option value="OWNER">OWNER</option>
                  <option value="SECRETARY">SECRETARY</option>
                </select>
              </div>
              <div>
                <button
                  className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
                  type="button"
                  onClick={() => setAllowEdition(!allowEdition)}>
                  {!allowEdition ? 'Activar Edición' : 'Desactivar Edición'}
                </button>
                <button
                  className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
                  type="submit">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};
