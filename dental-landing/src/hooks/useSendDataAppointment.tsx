/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Dentist } from "../types/dtos/dentist/dentist.type";
import { Patient } from "../types/dtos/Patient/NewPatient.type";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { appointmentsServices } from "../services";

export const useSendaDataAppointment = (
  dentistSelected: Dentist | null,
  patientSelected: Patient | null
) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dataAppointment, setDataAppointment] = useState<{
    results: string;
    dentistId: number | null;
    patientId: number | null;
    date: string;
    reason: string;
  }>({
    results: "",
    dentistId: null,
    patientId: null,
    date: "",
    reason: "",
  });

  useEffect(() => {
    setDataAppointment((prevData) => ({
      ...prevData,
      dentistId: dentistSelected?.id || null,
      patientId: patientSelected?.id || null,
    }));
  }, [dentistSelected, patientSelected]);

  useEffect(() => {
    if (date && time) {
      const dateTime = `${date}T${time}:00`;
      if (!isNaN(new Date(dateTime).getTime())) {
        setDataAppointment((prevData) => ({
          ...prevData,
          date: new Date(dateTime).toISOString(),
        }));
      }
    }
  }, [date, time]);

  const handleReasonChange = (reason: string) => {
    setDataAppointment((prevData) => ({
      ...prevData,
      reason,
    }));
  };

  const handleDateChange = (date: string) => {
    setDate(date);
  };

  const handleTimeChange = (time: string) => {
    setTime(time);
  };

  const handleCreateAppointment = async () => {
    try {
      await appointmentsServices.createAppointment(dataAppointment)
      Swal.fire({
        title: "Éxito",
        text: "La cita se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if(result.isConfirmed) {
          navigate('/appointments')
        }
      });
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      const errorStatus = error.response.data.statusCode
        ? error.response.data.statusCode
        : 500;
      Swal.fire({
        title: "Error",
        text: `${
          errorStatus === 400
            ? "Ocurrio un error de validacion. Verifique que todos los campos ingresados sean correctos"
            : errorStatus === 409
            ? errorMessage
            : "Interval server error. Por favor intente mas tarde"
        }`,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-acento",
        },
      });
    }
  };

  return {
    dataAppointment,
    handleReasonChange,
    handleDateChange,
    handleTimeChange,
    handleCreateAppointment
  };
};
