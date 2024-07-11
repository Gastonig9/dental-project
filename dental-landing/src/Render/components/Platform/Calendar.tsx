/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import verifyAppointment from "../../../assets/img/calendar/verify.png"
import cancelAppointment from "../../../assets/img/calendar/Cancel.png";
import viewAppointment from "../../../assets/img/calendar/Note.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Appointment } from "../../../types/dtos/appointment/appointment.type";

export const Calendar = ({ userData }: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const token = localStorage.getItem("token");
  const RoleObject = JSON.parse(localStorage.getItem("RoleObject") || "{}");
  const dentistId = RoleObject.dentist ? RoleObject.dentist.id : null;

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    const getAppointments = async () => {
      try {
        if (userData.role_name === "ASSOCIATED") {
          //En el caso de que el rol del usuario logueado sea "ASSOCIATED" se envia al array de appointments
          //solo los turnos asociados a ese usuario
          const responseAppointmentsForDentistRole = await axios.get(`${import.meta.env.VITE_API_URL}/dentist/appointments/${dentistId}`);
          const filteredAppointmentsForDentist = responseAppointmentsForDentistRole.data.appointments.filter((appointment: any) => appointment.state === "PENDING");
          setAppointments(filteredAppointmentsForDentist);
        } else {
          // Caso contrario, si es cualquier otro rol, se envian todos los turnos disponibles
          const responseAppointments = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments/`);
          const filteredAppointments = responseAppointments.data.filter((appointment: any) => appointment.state === "PENDING");
          setAppointments(filteredAppointments);
        }


      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAppointments();
  }, [token, userData.role_name, dentistId]);

  const handleChangeState = async (eventInfo: EventContentArg, newState: 'CANCEL' | "REALIZED", message: string, flag: boolean = true) => {
    const result = await Swal.fire({
      title: message,
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${flag ? 'Si, cancelar' : 'Si, finalizar'}`,
      cancelButtonText: "No, volver",
    });

    if (result.isConfirmed) {
      const id = parseInt(eventInfo.event.id);
      const data = { appointmentId: id, state: newState };

      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/appointments/update-appointment-state/`, data);

        if (response.status === 200) {
          Swal.fire(`Turno ${flag ? 'cancelado' : 'finalizado'}`, `El turno ha sido ${flag ? 'cancelado' : 'finalizado'} con éxito.`, "success");
          setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
        } else {
          Swal.fire("Error", `No se pudo ${flag ? 'cancelar' : 'finalizar'} el turno.`, "error");
        }
      } catch (error) {
        Swal.fire("Error", `Ocurrió un error al ${flag ? 'cancelar' : 'finalizar'} el turno.`, "error");
      }
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const state = eventInfo.event.extendedProps.state;
    if (state === "PENDING") {
      return (
        <div className="custom-event">
          <span>{eventInfo.timeText}</span>
          <span>{eventInfo.event.title}</span>
          {eventInfo.view.type === "timeGridDay" && (
            <>
              <span className="paciente">
                Paciente:{" "}
                <b>
                  {eventInfo.event.extendedProps.patient?.name}{" "}
                  {eventInfo.event.extendedProps.patient?.surname}
                </b>
              </span>
              <div className="event-buttons">
                {/* MARCAR COMO FINALIZADO */}
                <div onClick={() => handleChangeState(eventInfo, 'REALIZED', '¿Dar por finalizado este turno?', false)}>
                  <img src={verifyAppointment} alt="Finalizar" />
                </div>
                {/* Marcar turno como CANCELADO */}
                <div onClick={() => handleChangeState(eventInfo, 'CANCEL', '¿Estas seguro que deseas cancelar este turno?', true)}>
                  <img src={cancelAppointment} alt="Eliminar" />
                </div>
                {/* VER DETALLE DEL PACIENTE */}
                <div>
                  <Link to={`/patient-management/seeEditPatient/${eventInfo.event.extendedProps.patient?.id}`}>
                    <img src={viewAppointment} alt="Ver" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }
  };

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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formatAppointments}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridDay",
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


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import { EventContentArg } from "@fullcalendar/core/index.js";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import esLocale from "@fullcalendar/core/locales/es";
// import cancelAppointment from "../../../assets/img/calendar/Cancel.png";
// import viewAppointment from "../../../assets/img/calendar/Note.png";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { Appointment } from "../../../types/dtos/appointment/appointment.type";

// export const Calendar = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   useEffect(() => {
//     const getAppointments = async () => {
//       const responseAppointments = await fetch(
//         ${import.meta.env.VITE_API_URL}/api/appointments/
//       );
//       const dataAppointments = await responseAppointments.json();
//       setAppointments(dataAppointments);
//     };

//     getAppointments();
//   }, []);

//   const handleDelete = async (eventInfo: EventContentArg) => {
//     const result = await Swal.fire({
//       title: "¿Estás seguro que deseas cancelar el turno?",
//       text: "Esta accion es irreversible",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Cancelar",
//       cancelButtonText: "Volver",
//     });

//     if (result.isConfirmed) {
//       const id = parseInt(eventInfo.event.id);
//       const data = {
//         appointmentId: eventInfo.event.id,
//         state: "CANCELED",
//       };

//       try {
//         const response = await axios.put(
//           ${
//             import.meta.env.VITE_API_URL
//           }/api/appointments/update-appointment-state/,
//           data
//         );

//         if (response.status === 200) {
//           Swal.fire(
//             "Turno cancelado",
//             "El turno ha sido cancelado con exito.",
//             "success"
//           );

//           setAppointments((prevAppointments) =>
//             prevAppointments.filter((appointment) => appointment.id !== id)
//           );
//         } else {
//           Swal.fire("Error", "No se pudo eliminar el turno.", "error");
//         }
//       } catch (error) {
//         Swal.fire("Error", "Ocurrió un error al eliminar el turno.", "error");
//       }
//     }
//   };

//   const renderEventContent = (eventInfo: EventContentArg) => {
//     const state = eventInfo.event._def.extendedProps.state;
//     if (state === "PENDING") {
//       return (
//         <div className="custom-event">
//           <span>{eventInfo.timeText}</span>
//           <span>{eventInfo.event.title}</span>
//           {eventInfo.view.type === "timeGridDay" && (
//             <>
//               <span className="paciente">
//                 Paciente:{" "}
//                 <b>
//                   {eventInfo.event.extendedProps.patient.name}{" "}
//                   {eventInfo.event.extendedProps.patient.surname}
//                 </b>
//               </span>
//               <div className="event-buttons">
//                 <div>
//                   <Link
//                     to={/patient-management/seeEditPatient/${eventInfo.event.extendedProps.patient.id}}
//                   >
//                     <img src={viewAppointment} alt="Ver" />
//                   </Link>
//                 </div>
//                 <div onClick={() => handleDelete(eventInfo)}>
//                   <img src={cancelAppointment} alt="Eliminar" />
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       );
//     }
//   };

//   const handleDateClick = (arg: any) => {
//     const calendarApi = arg.view.calendar;
//     calendarApi.changeView("timeGridDay", arg.dateStr);
//   };

//   const formatAppointments = appointments.map((appointment) => ({
//     ...appointment,
//     id: appointment?.id?.toString(),
//   }));

//   return (
//     <div className="calendar-contain">
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={formatAppointments}
//         eventContent={renderEventContent}
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         locale={esLocale}
//         dateClick={handleDateClick}
//         eventTimeFormat={{
//           hour: "2-digit",
//           minute: "2-digit",
//           meridiem: false,
//         }}
//       />
//     </div>
//   );
// };