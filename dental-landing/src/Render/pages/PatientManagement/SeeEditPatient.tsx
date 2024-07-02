import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PersonalInfo } from "../../components/Platform/NewPatientTabContent/PersonalInfo";
import Navbar from "../../components/Platform/Navbar";
import SeeEditMedicalHistory from "./SeeEditMedicalHistory";

export const SeeEditPatient = () => {
  const [activeTab, setActiveTab] = useState("personal-information");
  
  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-[1594px] mt-[150px] ml-[220px]">
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
          <h1 className="poppins-semibold text-[33px]">Información del paciente</h1>
        </div>
        <main className="w-[90%] max-w-[1594px] h-[740px] rounded-[35px] bg-lightgray border border-[#424242] py-[30px] px-[78px] mx-auto">
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
                  activeTab === "medical-record" ? "text-black" : "text-[#9D9D9D]"
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

            <div className="p-4 rounded-lg">
              {activeTab === "personal-information" && (
                <section>
                  <PersonalInfo />
                </section>
              )}
              {/* {activeTab === "prestaciones" && (<section>Content for Prestaciones</section>)} */}
              {activeTab === "medical-record" && <SeeEditMedicalHistory />}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
