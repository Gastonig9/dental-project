import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import { PersonalInfo } from "../../sections/PatientManagement/PersonalInfo";
import MedicalHistory from "./MedicalHistory";
import { PatientContextProvider } from "../contexts/patientContext";
import Navbar from "../../components/Platform/Navbar";
import Prestaciones from "../../sections/PatientManagement/MedicalServices";

export const NewPatient = () => {
  const [activeTab, setActiveTab] = useState("My Account");
  const UserContext = createContext(null);

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
          <h1 className="poppins-semibold text-[33px]">Nuevo paciente</h1>
        </div>
        <main className="w-[90%] max-w-[1594px] h-[740px] rounded-[35px] bg-lightgray border border-[#424242] py-[30px] px-[78px] mx-auto overflow-y-scroll">
          <div>
            <div className="flex space-x-16 mb-4 poppins-regular text-[19px]">
              <button
                className={`text-lg font-medium ${
                  activeTab === "personal-information"
                    ? "text-black"
                    : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("personal-information")}
              >
                Ficha médica
              </button>
              <button
                className={`text-lg font-medium ${
                  activeTab === "medical-record"
                    ? "text-black"
                    : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("medical-record")}
              >
                Historia clínica
              </button>
              <button
                className={`text-lg font-medium ${
                  activeTab === "prestaciones" ? "text-black" : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("prestaciones")}
              >
                Prestaciones
              </button>
            </div>

            <PatientContextProvider>
              <div className="p-4 rounded-lg">
                {activeTab === "personal-information" && (
                  <section>
                    <PersonalInfo />
                  </section>
                )}
                {activeTab === "prestaciones" && <Prestaciones />}
                {activeTab === "medical-record" && <MedicalHistory />}
              </div>
            </PatientContextProvider>
          </div>
        </main>
      </section>
    </>
  );
};
