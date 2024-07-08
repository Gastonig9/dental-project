/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventContentArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import cancelAppointment from '../../../assets/img/calendar/Cancel.png';
import viewAppointment from '../../../assets/img/calendar/Note.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Appointment } from '../../../types/dtos/appointment/appointment.type';

export const Calendar = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const getAppointments = async () => {
      const responseAppointments = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/`
      );
      const dataAppointments = await responseAppointments.json();
      setAppointments(dataAppointments);
    };

    getAppointments();
  }, []);

  const handleDelete = async (eventInfo: EventContentArg) => {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas cancelar el turno?',
      text: 'Esta accion es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'Volver',
    });

    if (result.isConfirmed) {
      const id = parseInt(eventInfo.event.id);

      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/appointments/${id}`
        );

        if (response.status === 200) {
          Swal.fire(
            'Turno cancelado',
            'El turno ha sido cancelado con exito.',
            'success'
          );

          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== id)
          );
        } else {
          Swal.fire('Error', 'No se pudo eliminar el turno.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al eliminar el turno.', 'error');
      }
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="custom-event">
        <span>{eventInfo.timeText}</span>
        <span>{eventInfo.event.title}</span>
        {eventInfo.view.type === 'timeGridDay' && (
          <>
            <span className="paciente">
              Paciente:{' '}
              <b>
                {eventInfo.event.extendedProps.patient.name}{' '}
                {eventInfo.event.extendedProps.patient.surname}
              </b>
            </span>
            <div className="event-buttons">
              <div>
                <Link
                  to={`/patient-management/seeEditPatient/${eventInfo.event.extendedProps.patient.id}`}>
                  <img src={viewAppointment} alt="Ver" />
                </Link>
              </div>
              <div onClick={() => handleDelete(eventInfo)}>
                <img src={cancelAppointment} alt="Eliminar" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const handleDateClick = (arg: any) => {
    const calendarApi = arg.view.calendar;
    calendarApi.changeView('timeGridDay', arg.dateStr);
  };

  const formatAppointments = appointments.map((appointment) => ({
    ...appointment,
    id: appointment?.id?.toString(),
  }));

  return (
    <div className="calendar-contain">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formatAppointments}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale={esLocale}
        dateClick={handleDateClick}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </div>
  );
};
