/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { appointmentsServices } from "../services";
import { Appointment } from "../types/dtos/appointment/appointment.type";

export const useAppointmentSearch = (userData: any) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const RoleObject = JSON.parse(localStorage.getItem("RoleObject") || "{}");
  const dentistId = RoleObject.dentist ? RoleObject.dentist.id : null;

  const getAppointments = async () => {
    try {
      setLoading(true)
      let response: any;
      if (userData.role_name === "ASSOCIATED") {
        response = await appointmentsServices.getByDentistAppointmentId(
          dentistId
        );
      } else {
        response = await appointmentsServices.getAppointments();
      }
      const filteredAppointments = response.data.filter(
        (appointment: any) => appointment.state === "PENDING"
      );
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    getAppointments();
  }, [token, userData.role_name, dentistId]);

  return {
    appointments,
    setAppointments,
    loading
  };
};
