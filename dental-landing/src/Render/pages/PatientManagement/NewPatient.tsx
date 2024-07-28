import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PersonalInfo } from "../../sections/PatientManagement/PersonalInfo";
import MedicalHistory from "./MedicalHistory";

import Navbar from "../../components/Platform/Navbar";
import MedicalServices from "../../sections/PatientManagement/MedicalServices";
import { PatientContextProvider } from "../../../Features/contexts/patientContext";

export const NewPatient = () => {
  const [activeTab, setActiveTab] = useState("personal-information");
  const [user, setUser] = useState('')

  useEffect(()=>{
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    
    setUser(user.role_name)
  }, [])

  return (
    <>
      <Navbar />
      <section className="lg:ms-[250px] max-w-[1594px] mt-[150px] xxl:mx-auto ">
        <div className="flex items-center mb-6">
          <Link to="/patient-management/patients-list" className="me-16">
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
        <main className="w-[90%] max-w-[1594px] h-[740px] rounded-[35px] bg-lightgray border border-[#424242] py-[30px] px-[78px] mx-auto overflow-y-auto">
          <div>
            <div className="flex lg:space-x-16 mb-4 poppins-regular text-[19px] justify-center lg:justify-start">
              <button
                className={`text-lg font-medium border border-black rounded-tl-xl px-5 py-1 lg:p-0 lg:border-none ${
                  activeTab === "personal-information"
                    ? "text-black"
                    : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("personal-information")}
              >
                Ficha médica
              </button>
              <button
                className={`text-lg font-medium border border-black rounded-tr-xl px-5 py-1 lg:p-0 lg:border-none ${
                  activeTab === "medical-record"
                    ? "text-black"
                    : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("medical-record")}
              >
                Historia clínica
              </button>
              {user !== 'SECRETARY' && <button
                className={`text-lg font-medium hidden lg:block ${
                  activeTab === "prestaciones" ? "text-black" : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("prestaciones")}
              >
                Prestaciones
              </button>}
            </div>

            <PatientContextProvider>
              <div className="p-0 rounded-lg">
                {activeTab === "personal-information" && (
                  <section>
                    <PersonalInfo />
                  </section>
                )}
                {activeTab === "prestaciones" && <MedicalServices />}
                {activeTab === "medical-record" && <MedicalHistory />}
              </div>
            </PatientContextProvider>
          </div>
        </main>
      </section>
    </>
  );
};
