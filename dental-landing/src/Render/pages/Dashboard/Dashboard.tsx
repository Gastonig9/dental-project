import {
  ChevronRightIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Navbar from "../../components/Platform/Navbar";
import { useEffect, useState } from "react";


export const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // Function to get the current date in a desired format
    const getCurrentDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
      };
      return date.toLocaleDateString('es-AR', options);
    };

    // Set the current date when the component mounts
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <>
    <Navbar/>
    <main className="min-h-screen min-w-full flex flex-col lg:flex-row justify-center items-center mt-[90px] ms-0 lg:ms-[100px] pt-6 bg-background">
      <section className="mx-auto lg:mx-0 lg:me-[108px] w-[55%] lg:w-auto">
        <div className="mb-8">
          <h1 className="poppins-bold text-[23px] lg:text-[40px] mb-2">
            Bienvenido {userData.firstName} {userData.lastName}
          </h1>
          <p className="poppins-regular text-[19px]">{currentDate}</p>
        </div>

        {/* SEARCH MOBILE */}
        <div className="relative flex lg:hidden items-center">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
          </span>
          <input
            type="text"
            placeholder="Buscar paciente.."
            className="pl-10 pr-4 py-3 border border-[#424242] rounded-[10px] w-full focus:outline-none focus:border-acento"
          />
        </div>
        {/* SEARCH MOBILE */}

        <div className="hidden lg:block bg-lightgray poppins-regular border border-[#424242] w-[510px] h-[480px] rounded-[20px] py-7 px-9 mb-12">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-black" />
            </span>
            <input
              type="text"
              placeholder="Buscar paciente.."
              className="pl-10 pr-4 py-3 border border-[#424242] rounded-[10px] w-full focus:outline-none focus:border-acento"
            />
          </div>
        </div>
         {/* Render the button only if role_name is not 'SECRETARY' */}
         {userData.role_name !== 'SECRETARY' && (
            <div className="poppins-bold hidden lg:flex">
              <Link to="/users-management/users-list">
                <button className="flex justify-around items-center border border-[#424242] rounded-[20px] p-3 text-[25px]">
                  <UsersIcon
                    className="text-[25px] h-7 w-7 flex-none text-black me-2"
                    aria-hidden="true"
                  />
                  <span className="me-8">Gestionar usuarios</span>
                  <ChevronRightIcon
                    className="text-[25px] h-7 w-7 flex-none text-black"
                    aria-hidden="true"
                  />
                </button>
              </Link>
            </div>
          )}
      </section>
      <section className="flex justify-center items-center mx-auto lg:mx-0 pt-14">
        <div className="w-[349px] lg:w-[840px] h-[646px] lg:h-[665px] bg-lightgray border border-[#424242] rounded-[20px] lg:rounded-[30px] px-3 lg:px-14 py-4 lg:py-12">
          <h1 className="poppins-bold ms-5 mb-4 lg:mb-4 text-[26px] lg:text-[40px]">
            Próximos turnos
          </h1>
          <div>
            <div className="flex items-center px-7 py-5 bg-acento w-full h-[70px] rounded-[10px] mb-2 poppins-medium text-typography text-[16px] lg:text-[20px]">
              <p className="me-16">8:30</p>
              <p>[Nombre Paciente]</p>
            </div>
          </div>
        </div>
      </section>

      {/* GESTINAR USUARIOS BUTTON MOBILE */}
      {/* Render the button only if role_name is not 'SECRETARY' */}
      {userData.role_name !== 'SECRETARY' && (
      <div className="flex lg:hidden poppins-bold mx-auto my-14">
        <Link to="/users-management/users-list">
          <button className="flex justify-around items-center border border-[#424242] rounded-[20px] p-3 text-[20px]">
            <UsersIcon
              className="text-[25px] h-6 w-6 flex-none text-black me-2"
              aria-hidden="true"
            />
            <span className="me-16">Gestionar usuarios</span>
            <ChevronRightIcon
              className="text-[25px] h-8 w-8 flex-none text-black"
              aria-hidden="true"
            />
          </button>
        </Link> 
      </div>
      )}
    </main>
    </>
  );
};
