/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Navbar from "../../components/Platform/Navbar";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

// Definir la interfaz para los datos del formulario
interface DataForm {
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  role_name: string;
  password: string;
}

const CreateUser = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DataForm>();

  const onSubmit: SubmitHandler<DataForm> = async (data) => {
    try {
      const convertedData = {
        ...data,
        dni: parseInt(data.dni.toString(), 10),
      };
      await axios.post('http://localhost:3000/api/user/register-user', convertedData);
      Swal.fire({
        title: "Éxito",
        text: "Usuario creado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      reset()
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear el usuario.",
        icon: "error",
        confirmButtonText: "OK",
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
        <main className="w-[90%] max-w-[1594px] h-[900px] rounded-[35px] bg-lightgray border border-[#424242] py-[30px] px-[78px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center poppins-light text-[16px] space-y-4">
              <h1 className="poppins-semibold text-[33px] mb-5">
                Agregar nuevo usuario
              </h1>
              <div className="w-[122px] h-[122px] rounded-full bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP34iSqZQyUhayGE4vjJnPqZJWfEDXq67Udg&s')] bg-no-repeat bg-center bg-cover"></div>
              <div className="flex flex-col">
                <label htmlFor="firstName">Nombre usuario</label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: "El nombre es obligatorio" })}
                  className={`usermanagement-input-style`}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Apellido Usuario</label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: "El apellido es obligatorio" })}
                  className={`usermanagement-input-style`}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="dni">DNI</label>
                <input
                  type="text"
                  id="dni"
                  {...register("dni", { required: "El DNI es obligatorio" })}
                  className={`usermanagement-input-style`}
                />
                {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Formato de email inválido"
                    }
                  })}
                  className={`usermanagement-input-style`}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="rol_name">Rol</label>
                <select
                  id="rol_name"
                  {...register("role_name", { required: "El rol es obligatorio" })}
                  className={`usermanagement-input-select-style `}>
                  <option value="">Seleccione un rol</option>
                  <option value="OWNER">OWNER</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="ASSOCIATED">ASSOCIATED</option>
                </select>
                {errors.role_name && <p className="text-red-500">{errors.role_name.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  className={`usermanagement-input-style`}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <button
                  className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
                  type="submit"
                >
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

export default CreateUser;
