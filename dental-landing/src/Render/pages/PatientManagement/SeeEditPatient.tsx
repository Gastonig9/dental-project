import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Platform/Navbar";
import SeeEditMedicalHistory from "./SeeEditMedicalHistory";
import { SeeEditPersonalInfo } from "../PatientManagement/SeeEditPersonalInfo";

export const SeeEditPatient = () => {
  const [activeTab, setActiveTab] = useState("personal-information");
  
  return (
    <>
      <Navbar />
      <section className="max-w-[1594px] mt-[110px] lg:mt-[150px] lg:ml-[220px] xxl:mx-auto ">
        <div className="flex items-center lg:mb-6">
          <Link to="/patient-management/patients-list" className="me-16">
            <button className="hidden lg:flex items-center bg-transparent poppins-medium">
              <ChevronLeftIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
              Atrás
            </button>
          </Link>
          <h1 className="poppins-semibold text-[33px] hidden lg:block">Información del paciente</h1>
        </div>
        <main className="w-[90%] max-w-[1594px] lg:h-[740px] lg:rounded-[35px] lg:bg-lightgray lg:border lg:border-[#424242] lg:py-[30px] lg:px-[78px] mx-auto overflow-y-scroll">
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
                  activeTab === "medical-record" ? "text-black" : "text-[#9D9D9D]"
                }`}
                onClick={() => setActiveTab("medical-record")}
              >
                Historia clínica
              </button>
              <button
                className={`text-lg font-medium hidden lg:block ${
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
                  <SeeEditPersonalInfo />
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
