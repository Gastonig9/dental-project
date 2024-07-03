/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Button } from "../../UI/Button/Button";
import { Patient } from "../../../../types/dtos/patient/create-patient.type";
import { SearchPatientInput, SelectInput, DateTimeInput } from ".";
import { Dentist } from "../../../../types/dtos/dentist/dentist.type";

export const AddAppointment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Pacientes
  const [patientSelected, setPatientSelected] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  // Dentistas
  const [dentistSelected, setDentistSelected] = useState<Dentist | null>(null);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  // Datos del turno
  const [dataAppointment, setDataAppointment] = useState<{
    results: string;
    dentistId: number | null;
    patientId: number | null;
    date: string;
    reason: string;
  }>({
    results: '',
    dentistId: null,
    patientId: null,
    date: "",
    reason: ""
  });
  

  useEffect(() => {
    fetch("http://localhost:3000/patient/get-patients").then((response) => response.json()).then((data) => setPatients(data.patients));
  }, [])

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

  useEffect(() => {
    fetch("http://localhost:3000/dentist")
      .then((response) => response.json())
      .then((data) => setDentists(data.dentists));
  }, []);

  useEffect(() => {
    setDataAppointment((prevData) => ({
      ...prevData,
      dentistId: dentistSelected?.id || null,
      patientId: patientSelected?.id || null
    }));
  }, [dentistSelected, patientSelected]);

  const handlePatientSelected = (patient: Patient) => {
    setPatientSelected(patient);
    setSearchTerm(`${patient.name} ${patient.surname}`);
    setFilteredPatients([]);
  };

  const handleDentistSelected = (dentist: Dentist) => {
    setDentistSelected(dentist);
  };

  const handleDateChange = (date: string) => {
    setDataAppointment((prevData) => ({
      ...prevData,
      date
    }));
  };

  const handleReasonChange = (reason: string) => {
    setDataAppointment((prevData) => ({
      ...prevData,
      reason
    }));
  };

  const handleCreateAppointment = () => {
    console.log("creada", dataAppointment);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Link to="/appointments" className="me-16">
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
        <div className="w-[90%] flex flex-col items-center rounded-[35px] bg-lightgray border border-[#424242] p-6">
          <h1 className="poppins-semibold text-[33px] mb-6">
            Agregar nuevo turno
          </h1>
          <div className="w-full flex justify-evenly items-center">
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
          <DateTimeInput onDateChange={handleDateChange} />
          <SelectInput
            id="consulta"
            options={["Arreglo", "Conducto", "Consulta de rutina"]}
            titleSelect="Tipo de consulta"
            selectReason={handleReasonChange}
            mtInput="5"
          />
          <Button
            widthButton="[30%]"
            justifyButton="center"
            widthContain="full"
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
