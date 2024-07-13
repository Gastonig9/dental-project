/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import axios from "axios";
import Swal from "sweetalert2";
import { Appointment } from "../../../../types/dtos/appointment/appointment.type";
import { EventContent } from "./EventContent/EventContent";
import { UpdateAppointmentForm } from "./UpdateAppointmentForm/UpdateAppointmentForm";

export const Calendar = ({ userData }: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
  const token = localStorage.getItem("token");
  const RoleObject = JSON.parse(localStorage.getItem("RoleObject") || "{}");
  const dentistId = RoleObject.dentist ? RoleObject.dentist.id : null;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    const getAppointments = async () => {
      try {
        let response;
        if (userData.role_name === "ASSOCIATED") {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/dentist/appointments/${dentistId}`
          );
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/appointments/`
          );
        }
        const filteredAppointments = response.data.filter(
          (appointment: any) => appointment.state === "PENDING"
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAppointments();
  }, [token, userData.role_name, dentistId]);

  const handleChangeState = async (
    eventInfo: any,
    newState: "CANCEL" | "REALIZED",
    message: string,
    flag: boolean = true
  ) => {
    const result = await Swal.fire({
      title: message,
      text: `${flag ? 'Se enviará un aviso al paciente en caso de eliminar el turno' : 'Se eliminará de esta vista en caso de presionar “Finalizado”'}`,
      showCancelButton: true,
      confirmButtonColor: `${flag ? '#A10000' : '#76FFA8'}`,
      cancelButtonColor: "#F5F5F5",
      confirmButtonText: `${flag ? 'Eliminar' : 'Finalizado'}`,
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: `${flag ? 'custom-confirm-button-black' : 'custom-confirm-button-white'}`,
        cancelButton: 'custom-cancel-button',
      },
    });

    if (result.isConfirmed) {
      const id = parseInt(eventInfo.event.id);
      const data = { appointmentId: id, state: newState };

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/appointments/update-appointment-state/`,
          data
        );

        if (response.status === 200) {
          Swal.fire(
            `Turno ${flag ? 'cancelado' : 'finalizado'}`,
            `El turno ha sido ${flag ? 'cancelado' : 'finalizado'} con éxito.`,
            "success"
          );
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== id)
          );
        } else {
          Swal.fire(
            "Error",
            `No se pudo ${flag ? 'cancelar' : 'finalizar'} el turno.`,
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          `Ocurrió un error al ${
            flag ? 'cancelar' : 'finalizar'
          } el turno.`,
          "error"
        );
      }
    }
  };

  const handleDateClick = (arg: any) => {
    const calendarApi = arg.view.calendar;
    calendarApi.changeView("timeGridDay", arg.dateStr);
  };

  const handleOpenUpdateWindow = (event: any) => {
    setSelectedEvent(event);
    setOpenUpdateWindow(true);
  };

  const formatAppointments = appointments.map((appointment) => ({
    ...appointment,
    id: appointment?.id?.toString(),
  }));

  return (
    <div className="calendar-contain">
      {openUpdateWindow && selectedEvent && (
        <UpdateAppointmentForm
          selectedEvent={selectedEvent}
          closeUpdateWindow={() => setOpenUpdateWindow(false)}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formatAppointments}
        eventContent={(eventInfo) => (
          <EventContent
            eventInfo={eventInfo}
            handleChangeState={handleChangeState}
            handleOpenUpdateWindow={handleOpenUpdateWindow}
          />
        )}
        headerToolbar={{
          left: `${isSmallScreen > 954 ? "prev,next today" : ""}`,
          center: `${isSmallScreen > 954 ? "title" : "prev,title,next"}`,
          right: `${isSmallScreen > 954 ? "dayGridMonth,timeGridDay" : ""}`,
        }}
        locale={esLocale}
        dateClick={handleDateClick}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        }}
      />
    </div>
  );
};
