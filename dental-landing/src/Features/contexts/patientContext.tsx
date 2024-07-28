import React, { createContext, useContext, useState } from "react";
import { Patient } from "../../types/dtos/Patient/NewPatient.type";

interface InitialState {
  patientData: Patient | null;
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientContext = createContext<InitialState | undefined>(undefined);

export const PatientContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [patientData, setPatientData] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ patientData, setPatientData }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = (): InitialState => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error(
      "usePatientContext must be used within a PatientContextProvider"
    );
  }
  return context;
};
