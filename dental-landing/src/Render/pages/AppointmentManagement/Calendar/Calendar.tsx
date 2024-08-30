/* eslint-disable @typescript-eslint/no-explicit-any */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { EventContent } from "./EventContent/EventContent";
import { UpdateAppointmentForm } from "./UpdateAppointmentForm/UpdateAppointmentForm";
import { useAppointmentSearch, useAppointmentChangeState, useHandleCalendarEvent, useScreenWidth } from "../../../../hooks";

export const Calendar = ({ userData }: any) => {
  const isSmallScreen = useScreenWidth();
  const { appointments, setAppointments } = useAppointmentSearch(userData);
  const { handleChangeState } = useAppointmentChangeState(setAppointments);
  const { handleOpenUpdateWindow, setOpenUpdateWindow, openUpdateWindow, selectedEvent } = useHandleCalendarEvent();

  const handleDateClick = (arg: any) => {
    const calendarApi = arg.view.calendar;
    calendarApi.changeView("timeGridDay", arg.dateStr);
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
