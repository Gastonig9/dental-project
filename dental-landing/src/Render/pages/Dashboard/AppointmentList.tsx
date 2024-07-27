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

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  function setOrderAppointments(appointments: Appointment[]) {
    const orderAppointments = appointments
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter((appointment) => appointment.state === 'PENDING')
      .slice(0, 6);

    setAppointments(orderAppointments);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const RoleObject = JSON.parse(localStorage.getItem('RoleObject') || '{}');
    const dentistId = RoleObject.dentist ? RoleObject.dentist.id : null;

    (async () => {
      try {
        if (dentistId) {
          const dentistResponse = await axios.get<{
            appointments: Appointment[];
          }>(
            `${import.meta.env.VITE_API_URL}/dentist/appointments/${dentistId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const dentistAppointments = dentistResponse.data.appointments.map(
            (appointment) => ({
              ...appointment,
              dentist: appointment.dentist
                ? { fullname: appointment.dentist.fullname }
                : { fullname: 'Unknown' },
              patient: {
                id: appointment.patientId,
                name: appointment.patient.name,
                surname: appointment.patient.surname,
              },
            })
          );
          setOrderAppointments(dentistAppointments);
        } else {
          const secretaryResponse = await axios.get<Appointment[]>(
            `${import.meta.env.VITE_API_URL}/api/appointments`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(secretaryResponse.data);

          setOrderAppointments(secretaryResponse.data);
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    })();
  }, []);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <section className="flex justify-center items-center mx-auto lg:mx-0 pt-14">
      <div className="w-[349px] lg:w-[840px] h-[646px] lg:h-[665px] bg-lightgray border border-[#424242] rounded-[20px] lg:rounded-[30px] px-3 lg:px-14 py-4 lg:py-12 appointment-container-medium">
        <h1 className="poppins-bold ms-5 mb-4 lg:mb-4 text-[26px] lg:text-[40px] dashboard-title-medium">
          Próximos turnos
        </h1>
        <div className="scroll-appoinments-medium">
          {appointments.map((appointment, index) => (
            <div
              key={`${appointment.id}-${index}`}
              className="flex items-center px-7 py-5 bg-acento w-full h-[70px] rounded-[10px] mb-2 poppins-medium text-typography text-[16px] lg:text-[20px] dashboard-text-medium">
              <div className="flex items-center me-12">
                <p>
                  {new Date(appointment.date).toLocaleDateString([], {
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <p className="mx-3">-</p>
                <p>
                  {new Date(appointment.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {userData.role_name === 'SECRETARY' && (
                <>
                  <p className="">
                    {`${appointment.patient.name} ${appointment.patient.surname}`}
                  </p>
                  <p className="ms-auto">{appointment.dentist.fullname}</p>
                </>
              )}
              {userData.role_name !== 'SECRETARY' && (
                <>
                  <p className="me-4">
                    {appointment.patient.name}, {appointment.patient.surname}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
