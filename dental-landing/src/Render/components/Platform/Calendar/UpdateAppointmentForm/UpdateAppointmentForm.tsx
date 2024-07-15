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
  closeUpdateWindow: any;
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
    date: string | null;
  }>({
    dentistId: null,
    patientId: null,
    date: null,
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
    console.log(dataAppointment)
    const appointmentId = selectedEvent._def.publicId;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointments/update-appointment/${appointmentId}`,
        dataAppointment
      );
      console.log(response)
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
      console.log(error)
      const errorMessage = error.response.data.message;
      const errorStatus = error.response.data.statusCode
        ? error.response.data.statusCode
        : 500;
      Swal.fire({
        title: "Error",
        text: `${
          errorStatus === 400
            ? 'No se han proporcionado todos los datos requeridos para actualizar el turno'
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
    <div className="fixed inset-0 flex items-center justify-center z-40 p-4 animate__animated animate__bounceIn">
      <div className="bg-[#F5F5F5] rounded-[15px] border border-black w-full max-w-5xl p-6 sm:p-9 space-y-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="poppins-semibold text-[24px] md:text-[33px]">Editar turno</h1>
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
        <div className="flex flex-col sm:flex-row justify-around mt-5 space-y-5 sm:space-y-0">
          <TimeInput onTimeChange={handleTimeChange} />
          <SelectInput
            options={dentists}
            titleSelect="Profesional"
            selectDentist={handleDentistSelected}
            id="profesional"
          />
        </div>
        <div className="flex justify-center">
          <Button
            onAction={() => handleUpdateAppointment()}
            justifyButton="center"
            titleButton="Guardar"
            widthButton="[30%]"
            isLink={false}
            marginTop="5"
            widthContain="[100%]"
            marginBottom="0"
          />
        </div>
      </div>
    </div>
  );
};
