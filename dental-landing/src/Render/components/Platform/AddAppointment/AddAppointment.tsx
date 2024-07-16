/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../UI/Button/Button";
import { Patient } from "../../../../types/dtos/Patient/NewPatient.type";
import { SearchPatientInput, SelectInput, DateTimeInput, TimeInput } from ".";
import { Dentist } from "../../../../types/dtos/dentist/dentist.type";
import Swal from "sweetalert2";
import { appointmentsServices, dentistService, patientServices } from "../../../../services";

export const AddAppointment = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [patientSelected, setPatientSelected] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [dentistSelected, setDentistSelected] = useState<Dentist | null>(null);
  const [dentists, setDentists] = useState<Dentist[]>([]);

  //DATA PARA CREAR UN TURNO
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
    const fetchPatients = async () => {
      try {
        const response = await patientServices.getPatients()
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await dentistService.getDentists()
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

  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(
        patients.filter((patient) =>
          `${patient.name} ${patient.surname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPatients([]);
    }
  }, [searchTerm, patients]);

  const handleDentistSelected = (dentist: Dentist) => {
    setDentistSelected(dentist);
  };

  const handleDateChange = (date: string) => {
    setDate(date);
  };

  const handleTimeChange = (time: string) => {
    setTime(time);
  };

  const handleReasonChange = (reason: string) => {
    setDataAppointment((prevData) => ({
      ...prevData,
      reason,
    }));
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
      console.log(error);
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

  const handlePatientSelected = (patient: Patient) => {
    setPatientSelected(patient);
    setSearchTerm(`${patient.name} ${patient.surname}`);
    setFilteredPatients([]);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Link to="/appointments" className="mr-4 lg:mr-16">
          <button className="flex items-center bg-transparent poppins-medium">
            <ChevronLeftIcon
              className="h-5 w-5 flex-none text-black"
              aria-hidden="true"
            />
            Atrás
          </button>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[90%] flex flex-col items-center rounded-[35px] bg-lightgray border border-[#424242] p-4 md:p-6">
          <h1 className="poppins-semibold text-[24px] md:text-[33px] mb-6">
            Agregar nuevo turno
          </h1>
          <div className="w-full flex flex-col lg:flex-row justify-evenly items-center gap-4">
            <SearchPatientInput
              searchTerm={searchTerm}
              setSearchTerm={(term) => {
                setSearchTerm(term);
                setPatientSelected(null);
              }}
              filteredPatients={filteredPatients}
              handlePatientSelected={handlePatientSelected}
            />
            <SelectInput
              id="profesional"
              options={dentists}
              selectDentist={handleDentistSelected}
              titleSelect="Seleccionar profesional"
            />
          </div>
          <div className="w-full flex flex-col justify-evenly items-center gap-4 mt-4">
            <DateTimeInput onDateChange={handleDateChange} />
            <div className="w-full flex flex-col lg:flex-row justify-evenly items-center gap-4 mt-4">
              <TimeInput onTimeChange={handleTimeChange} />
              <SelectInput
                id="consulta"
                options={["Arreglo", "Conducto", "Consulta de rutina"]}
                titleSelect="Tipo de consulta"
                selectReason={handleReasonChange}
              />
            </div>
          </div>
          <Button
            widthButton="w-full"
            justifyButton="center"
            titleButton="Agendar"
            isLink={false}
            marginTop="5"
            onAction={handleCreateAppointment}
          />
        </div>
      </div>
    </>
  );
};
