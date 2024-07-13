/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import cancel from "../../../../../assets/img/calendar/Cancel.png";
import { DateTimeInput, SelectInput } from "../../AddAppointment";
import { TimeInput } from "../../AddAppointment/TimeInput/TimeInput";
import axios from "axios";
import { Dentist } from "../../../../../types/dtos/dentist/dentist.type";
import Swal from "sweetalert2";
import { Button } from "../../../UI/Button/Button";

interface UpdateAppointmentFormProps {
  selectedEvent: any;
  closeUpdateWindow: any
}

export const UpdateAppointmentForm: React.FC<UpdateAppointmentFormProps> = ({
  selectedEvent,
  closeUpdateWindow
}) => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [dentistSelected, setDentistSelected] = useState<Dentist | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dataAppointment, setDataAppointment] = useState<{
    dentistId: number | null;
    patientId: number | null;
    date: string;
  }>({
    dentistId: null,
    patientId: null,
    date: "",
  });

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dentist`
        );
        setDentists(response.data.dentists);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };
    fetchDentists();
  }, []);

  useEffect(() => {
    setDataAppointment((prevData) => ({
      ...prevData,
      dentistId: dentistSelected?.id || null,
      patientId: selectedEvent.extendedProps.patient?.id || null,
    }));
  }, [dentistSelected, selectedEvent.extendedProps.patient?.id]);

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

  const handleDateChange = (date: string) => {
    setDate(date);
  };

  const handleTimeChange = (time: string) => {
    setTime(time);
  };

  const handleDentistSelected = (dentist: Dentist) => {
    setDentistSelected(dentist);
  };

  const handleUpdateAppointment = async () => {
    const appointmentId = selectedEvent._def.publicId;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointments/update-appointment/${appointmentId}`,
        dataAppointment
      );
      Swal.fire({
        title: "Éxito",
        text: "La cita se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          closeUpdateWindow();
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
  
  return (
    <div className="fixed top-[25%] left-[27%] w-[900px] h-[auto] bg-[#F5F5F5] rounded-[15px] border border-black z-40 p-9">
      <div className="w-full flex justify-between">
        <h1 className="poppins-semibold text-[24px] md:text-[33px]">
          Editar turno
        </h1>
        <img
          className="w-11 h-11 hover:cursor-pointer"
          src={cancel}
          alt="Cerrar"
          onClick={closeUpdateWindow}
        />
      </div>
      <div className="w-full">
        <h1 className="text-[25px]">
          Nombre del paciente:{" "}
          <span className="poppins-bold">
            {selectedEvent?.extendedProps.patient?.name}{" "}
            {selectedEvent?.extendedProps.patient?.surname}
          </span>
        </h1>
      </div>
      <div>
        <DateTimeInput onDateChange={handleDateChange} />
      </div>
      <div className="flex justify-around mt-5">
        <TimeInput onTimeChange={handleTimeChange} />
        <SelectInput
          options={dentists}
          titleSelect="Profesional"
          selectDentist={handleDentistSelected}
          id="profesional"
        />
      </div>
      <Button onAction={() => handleUpdateAppointment()} justifyButton="center" titleButton="Guardar" widthButton="[30%]" isLink={false} marginTop="5" widthContain="[100%]" marginBottom="0"/>
    </div>
  );
};
