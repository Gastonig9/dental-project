/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import editAppointment from "../../../assets/img/calendar/Create.png";
import cancelAppointment from "../../../assets/img/calendar/Cancel.png";
import viewAppointment from "../../../assets/img/calendar/Note.png";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const responseAppointments = await fetch(
        "http://localhost:3000/api/appointments/"
      );
      const dataAppointments = await responseAppointments.json();
      setAppointments(dataAppointments);
    };

    getAppointments();
  }, []);

  const handleEdit = (eventInfo: any) => {
    console.log("Edit event:", eventInfo.event);
  };

  const handleDelete = (eventInfo: any) => {
    console.log("Delete event:", eventInfo.event);
  };

  const handleView = (eventInfo: any) => {
    console.log("View event:", eventInfo.event);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="custom-event">
        <span>{eventInfo.timeText}</span>
        <span>{eventInfo.event.title}</span>
        {eventInfo.view.type === "timeGridDay" && (
          <>
            <span className="paciente">
              Paciente:{" "}
              <b>
                {eventInfo.event.extendedProps.patient.name}{" "}
                {eventInfo.event.extendedProps.patient.surname}
              </b>
            </span>
            <div className="event-buttons">
              <div onClick={() => handleEdit(eventInfo)}>
                <img src={editAppointment} alt="Editar" />
              </div>
              <div onClick={() => handleDelete(eventInfo)}>
                <img src={cancelAppointment} alt="Eliminar" />
              </div>
              <div onClick={() => handleView(eventInfo)}>
                <img src={viewAppointment} alt="Ver" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const handleDateClick = (arg: any) => {
    const calendarApi = arg.view.calendar;
    calendarApi.changeView("timeGridDay", arg.dateStr);
  };

  return (
    <div className="calendar-contain">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={appointments}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
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
