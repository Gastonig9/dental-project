import {
  ChevronRightIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Platform/Navbar";
import { Patient } from "../../../types/dtos/Patient/NewPatient.type";
import { patientServices } from "../../../services";
import { IoIosArrowForward } from "react-icons/io";
import AppointmentList from "./AppointmentList/AppointmentList";
import { usePatientFilter, useCurrentDate } from "../../../hooks";

export const Dashboard = () => {
  const [originalData, setOriginalData] = useState<Patient[]>([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    patientServices
      .getPatients()
      .then((res) => {
        setOriginalData(res.data.patients);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = usePatientFilter(originalData, inputData);
  const currentDate = useCurrentDate();

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Navbar />
      <main className="dashboard-medium min-h-screen min-w-full flex flex-col newlg:flex-row justify-center items-center mt-[100px] ms-0 lg:ms-[100px] pt-6 bg-background">
        <section className="mx-auto lg:mx-0 lg:me-[108px] w-[80%] lg:w-auto left-section-medium">
          <div className="mb-8">
            <h1 className="poppins-bold text-[23px] lg:text-[40px] mb-2 dashboard-title-medium">
              Bienvenido {userData.firstName} {userData.lastName}
            </h1>
            <p className="poppins-regular text-[19px] dashboard-text-medium">
              {currentDate}
            </p>
          </div>

          {/* SEARCH MOBILE */}
          <div className="relative flex lg:hidden items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-black" />
            </span>
            <input
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
              type="text"
              placeholder="Buscar paciente.."
              className="pl-10 pr-4 py-3 border border-[#424242] rounded-[10px] w-full focus:outline-none focus:border-acento"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3 lg:hidden">
            {filteredData.length > 0 ? (
              filteredData.slice(0, 3).map((paciente, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 items-center justify-between bg-[#D9D9D9] py-4 px-3 rounded-[10px] sm:px-8"
                >
                  <h3 className="text-[16px] font-semibold col-span-4">
                    {paciente.name} {paciente.surname}
                  </h3>
                  <h4 className="text-[11px] text-center col-span-2">
                    N° DNI: {String(paciente.dni)}{" "}
                  </h4>
                  {userData.role_name !== "SECRETARY" && (
                    <div className="flex items-center justify-end gap-2 col-span-2">
                      <Link
                        to={`/patient-management/seeEditPatient/${paciente.id}`}
                        className="bg-[#f5f5f5] p-2 rounded-lg"
                      >
                        <IoIosArrowForward />
                      </Link>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h3 className="text-[16px] font-semibold col-span-4">
                Sin resultados
              </h3>
            )}
          </div>
          {/* SEARCH MOBILE */}

          <div className="hidden lg:block bg-lightgray poppins-regular border border-[#424242] w-[510px] h-[480px] rounded-[20px] py-7 px-9 mb-12 search-container-medium">
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-black" />
              </span>
              <input
                onChange={(e) => setInputData(e.target.value)}
                value={inputData}
                type="text"
                placeholder="Buscar paciente.."
                className="pl-10 pr-4 py-3 border border-[#424242] rounded-[10px] w-full focus:outline-none focus:border-acento"
              />
            </div>

            <div className="flex flex-col gap-y-[10px] mt-5 overflow-y-scroll h-[346px] scrollbar-patients-dashboard scroll-search-medium">
              {filteredData.length > 0 ? (
                filteredData.map((paciente) => (
                  <div
                    key={String(paciente.id)}
                    className="flex justify-between items-center w-full bg-[#D9D9D9] rounded-[20px] py-3 px-6"
                  >
                    <div className="items-center text-[16px] font-bold flex dashboard-search-text">
                      <h3 className="me-8">
                        {paciente.name} {paciente.surname}
                      </h3>
                      <h3 className="hidden xl:block text-right xl:text-center">
                        {String(paciente.dni)}
                      </h3>
                    </div>
                    {userData.role_name !== "SECRETARY" && (
                      <div className="flexitems-center gap-7">
                        <Link
                          className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 xl:gap-[10]"
                          to={`/patient-management/seeEditPatient/${paciente.id}`}
                        >
                          <p className="hidden">Ver ficha médica</p>
                          <IoIosArrowForward />
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h3 className="text-[16px] font-semibold col-span-4">
                  Sin resultados
                </h3>
              )}
            </div>
          </div>
          {/* Render the button only if role_name is not 'SECRETARY' */}
          {userData.role_name === "OWNER" && (
            <div className="poppins-bold hidden lg:flex">
              <Link to="/users-management/users-list">
                <button className="flex justify-around items-center border border-[#424242] rounded-[20px] p-3 text-[25px] management-button-medium">
                  <UsersIcon
                    className="text-[25px] h-7 w-7 flex-none text-black me-2"
                    aria-hidden="true"
                  />
                  <span className="me-8">Gestionar empleados</span>
                  <ChevronRightIcon
                    className="text-[25px] h-7 w-7 flex-none text-black"
                    aria-hidden="true"
                  />
                </button>
              </Link>
            </div>
          )}
        </section>
        <AppointmentList />

        {/* GESTINAR USUARIOS BUTTON MOBILE */}
        {userData.role_name === "OWNER" && (
          <div className="flex lg:hidden poppins-bold mx-auto my-14">
            <Link to="/users-management/users-list">
              <button className="flex justify-around items-center border border-[#424242] rounded-[20px] p-3 text-[20px]">
                <UsersIcon
                  className="text-[25px] h-6 w-6 flex-none text-black me-2"
                  aria-hidden="true"
                />
                <span className="me-9">Gestionar empleados</span>
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
