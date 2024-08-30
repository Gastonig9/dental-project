import { useState } from 'react';
import Navbar from '../../components/Platform/Navbar';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { PatientsStatistics, AppointmentsStatistics } from './Statistics';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('patients-reports');
  return (
    <>
      <Navbar />
      <section className="max-w-[1594px] mt-[110px] lg:mt-[150px] lg:ml-[220px] xxl:mx-auto ">
        <div className="flex items-center lg:mb-6">
          <Link to="/dashboard" className="me-16">
            <button className="hidden lg:flex items-center bg-transparent poppins-medium">
              <ChevronLeftIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
              Volver al inicio
            </button>
          </Link>
        </div>

        <main className="w-[90%] max-w-[1594px] lg:h-[740px] lg:rounded-[35px] lg:bg-white lg:py-[30px] lg:px-[78px] mx-auto overflow-y-scroll scrollbar-reports">
          <div>
            <div className="flex lg:space-x-16 mb-4 poppins-regular text-[19px] justify-center lg:justify-start">
              <button
                className={`text-3xl font-medium border border-black rounded-tl-xl px-5 py-1 lg:p-0 lg:border-none ${
                  activeTab === 'patients-reports'
                    ? 'text-black'
                    : 'text-[#9D9D9D]'
                }`}
                onClick={() => setActiveTab('patients-reports')}>
                Pacientes
              </button>
              <button
                className={`text-3xl font-medium border border-black rounded-tr-xl px-5 py-1 lg:p-0 lg:border-none ${
                  activeTab === 'appointments-reports'
                    ? 'text-black'
                    : 'text-[#9D9D9D]'
                }`}
                onClick={() => setActiveTab('appointments-reports')}>
                Turnos
              </button>
            </div>

            <div className="p-4 rounded-lg">
              {activeTab === 'patients-reports' && <PatientsStatistics />}
              {activeTab === 'appointments-reports' && (
                <AppointmentsStatistics />
              )}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Reports;
