import { useState, useEffect } from "react";
import { Patient } from "../types/dtos/Patient/NewPatient.type";
import { patientServices } from "../services";

export const usePatientSearch = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientSelected, setPatientSelected] = useState<Patient | null>(null);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientServices.getPatients();
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

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

  const handlePatientSelected = (patient: Patient) => {
    setPatientSelected(patient);
    setSearchTerm(`${patient.name} ${patient.surname}`);
    setFilteredPatients([]);
  };

  return {
    patients,
    patientSelected,
    filteredPatients,
    searchTerm,
    setSearchTerm,
    setFilteredPatients,
    setPatientSelected,
    handlePatientSelected
  };
};
