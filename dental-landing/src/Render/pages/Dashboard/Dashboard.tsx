import {
  ChevronRightIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Platform/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: number;
  date: string;
  dentistId: number;
  patientId: number;
  state: string;
  results: string;
  reason: string;
  odontograma: string;
  patient: {
    id: number;
    name: string;
    surname: string;
  };
  dentist: {
    fullname: string;
  };
}

export const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<{ [key: number]: string }>({});

  useEffect(() => {
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

    setCurrentDate(getCurrentDate());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const RoleObject = JSON.parse(localStorage.getItem('RoleObject') || '{}');
    const dentistId = RoleObject.dentist ? RoleObject.dentist.id : null;

    const fetchAppointments = async () => {
      try {
        let allAppointments: Appointment[] = [];

        if (dentistId) {
          const dentistResponse = await axios.get<{
            appointments: Appointment[];
          }>(
            `${import.meta.env.VITE_API_URL}/dentist/appointments/${dentistId}`
          );
          const dentistAppointments = dentistResponse.data.appointments.map(
            (appointment) => ({
              ...appointment,
              dentist: appointment.dentist
                ? { fullname: appointment.dentist.fullname }
                : { fullname: 'Unknown' },
              patient: {
                id: appointment.patientId,
                name: 'Unknown',
                surname: 'Patient',
              },
            })
          );
          allAppointments = [...allAppointments, ...dentistAppointments];
        }

        const allResponse = await axios.get<Appointment[]>(
          `${import.meta.env.VITE_API_URL}/api/appointments`
        );
        allAppointments = [...allAppointments, ...allResponse.data];

        // Remove duplicates based on appointment id
        const uniqueAppointments = Array.from(
          new Map(allAppointments.map((item) => [item.id, item])).values()
        );

        setAppointments(uniqueAppointments);

        // Fetch patient data
        const patientIds = uniqueAppointments.map(
          (appointment) => appointment.patientId
        );
        const patientRequests = patientIds.map((patientId) =>
          axios.get<{ id: number; name: string; surname: string }>(
            `${import.meta.env.VITE_API_URL}/patient/${patientId}`
          )
        );

        const patientResponses = await Promise.all(patientRequests);
        const patientsData = patientResponses.reduce((acc, res) => {
          acc[res.data.id] = `${res.data.name} ${res.data.surname}`;
          return acc;
        }, {} as { [key: number]: string });

        setPatients(patientsData);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <Navbar />
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
        <section className="flex justify-center items-center mx-auto lg:mx-0 pt-14">
          <div className="w-[349px] lg:w-[840px] h-[646px] lg:h-[665px] bg-lightgray border border-[#424242] rounded-[20px] lg:rounded-[30px] px-3 lg:px-14 py-4 lg:py-12 overflow-y-auto">
            <h1 className="poppins-bold ms-5 mb-4 lg:mb-4 text-[26px] lg:text-[40px]">
              Próximos turnos
            </h1>
            <div>
              {appointments.map((appointment, index) => (
                <div
                  key={`${appointment.id}-${index}`}
                  className="flex items-center px-7 py-5 bg-acento w-full h-[70px] rounded-[10px] mb-2 poppins-medium text-typography text-[16px] lg:text-[20px]">
                  <p className="me-16">
                    {new Date(appointment.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {userData.role_name === 'SECRETARY' && (
                    <>
                      <p className="me-4">
                        Paciente:{' '}
                        {`${appointment.patient.name} ${appointment.patient.surname}`}{' '}
                        -
                      </p>
                      <p>Profesional: {appointment.dentist.fullname}</p>
                    </>
                  )}
                  {userData.role_name !== 'SECRETARY' && (
                    <p>{patients[appointment.patient.id] || 'Loading...'}</p>
                  )}
                </div>
              ))}
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
