import React from "react";
import { Link } from "react-router-dom";
import updateAppointment from "../../../../../assets/img/calendar/update.png";
import verifyAppointment from "../../../../../assets/img/calendar/verify.png";
import cancelAppointment from "../../../../../assets/img/calendar/Cancel.png";
import viewAppointment from "../../../../../assets/img/calendar/Note.png";
import { EventContentProps } from "../../../../../types/props/calendar.props";

export const EventContent: React.FC<EventContentProps> = ({
  eventInfo,
  handleChangeState,
  handleOpenUpdateWindow,
}) => {
  const state = eventInfo.event.extendedProps.state;
  if (state === "PENDING") {
    return (
      <div className="custom-event">
        <span>{eventInfo.timeText}</span>
        <span>{eventInfo.event.title}</span>
        {eventInfo.view.type === "timeGridDay" && (
          <>
            <div className="event-info">
              <span className="paciente">
                Paciente:{" "}
                <b>
                  {eventInfo.event.extendedProps.patient?.name}{" "}
                  {eventInfo.event.extendedProps.patient?.surname}
                </b>
              </span>
              <span className="paciente">
                Asignado:{" "}
                <b>Dr. {eventInfo.event.extendedProps.dentist?.fullname}</b>
              </span>
            </div>

            <div className="event-buttons">
              {/* Actualizar turno */}
              <div onClick={() => handleOpenUpdateWindow(eventInfo.event)}>
                <img
                  src={updateAppointment}
                  alt="Actualizar"
                  title="Actualizar turno"
                />
              </div>
              {/* Marcar turno como CANCELADO */}
              <div
                onClick={() =>
                  handleChangeState(
                    eventInfo,
                    "CANCEL",
                    "¿Deseas eliminar el turno?",
                    true
                  )
                }
              >
                <img
                  src={cancelAppointment}
                  alt="Eliminar"
                  title="Cancelar turno"
                />
              </div>
              {/* VER DETALLE DEL PACIENTE */}
              <div>
                <Link
                  to={`/patient-management/seeEditPatient/${eventInfo.event.extendedProps.patient?.id}`}
                >
                  <img
                    src={viewAppointment}
                    alt="Ver"
                    title="Ver ficha medica del paciente"
                  />
                </Link>
              </div>
            </div>
            <div className="finalized-button">
              {/* MARCAR COMO FINALIZADO */}
              <div
                onClick={() =>
                  handleChangeState(
                    eventInfo,
                    "REALIZED",
                    "¿El turno ha sido finalizado?",
                    false
                  )
                }
              >
                <img
                  src={verifyAppointment}
                  alt="Finalizar"
                  title="Finalizar turno"
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  return null;
};
