import { Link } from "react-router-dom";
import Navbar from "../../components/Platform/Navbar";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export const EditUserInfo = () => {
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
                className="usermanagement-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName">Apellido Usuario</label>
              <input
                type="text"
                id="lastName"
                className="usermanagement-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="usermanagement-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rol">rol</label>
              <select
                name="rol_name"
                id="rol"
                className="usermanagement-input-select-style"
              >
                <option value="OWNER">OWNER</option>
                <option value="SECRETARY">SECRETARY</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="bg-acento poppins-semibold py-2 px-4 rounded-[8px] mt-10"
              >
                Editar
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
