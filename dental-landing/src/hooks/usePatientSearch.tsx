import { useState, useEffect } from "react";
import { Patient } from "../types/dtos/Patient/NewPatient.type";
import { patientServices } from "../services";

export const usePatientSearch = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await patientServices.getPatients();
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
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
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  return {
    patients,
    filteredPatients,
    searchTerm,
    setSearchTerm,
    loading,
  };
};
