import { useEffect, useState } from "react";
import { Patient } from "../types/dtos/Patient/NewPatient.type";

export const usePatientFilter = (
  originalData: Patient[],
  inputData: string
) => {
  const [filteredData, setFilteredData] = useState<Patient[]>(originalData);

  useEffect(() => {
    const searchFilter = (query: string) => {
      return originalData.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query.toLowerCase().trim()) ||
          patient.surname.toLowerCase().includes(query.toLowerCase().trim())
      );
    };

    setFilteredData(inputData ? searchFilter(inputData) : originalData);
  }, [inputData, originalData]);

  return filteredData;
};
