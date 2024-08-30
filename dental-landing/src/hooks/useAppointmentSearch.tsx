/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { appointmentsServices } from "../services";
import { Appointment } from "../types/dtos/appointment/appointment.type";

export const useAppointmentSearch = (userData: any) => {
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
            let response: any;
            if (userData.role_name === "ASSOCIATED") {
              response = await appointmentsServices.getByDentistAppointmentId(dentistId)
            } else {
              response = await appointmentsServices.getAppointments()
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

  return {
    appointments,
    setAppointments
  };
};
