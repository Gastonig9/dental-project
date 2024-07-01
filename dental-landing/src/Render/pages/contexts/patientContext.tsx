import { createContext, useContext, useEffect, useState } from 'react';
import { Patient } from '../../../types/dtos/user/NewPatient.type'

interface InitialState {
  paciente: Patient | null;
  setPaciente: (paciente: Patient) => void;
}

const PatientContext = createContext<InitialState | null>(null);

export const PatientContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [paciente, setPaciente] = useState<Patient | null>(null);

  const data = {
    paciente,
    setPaciente,
  };

   useEffect(()=>{
    console.log(paciente)
   }, [paciente])

  return <PatientContext.Provider value={data}> { children } </PatientContext.Provider>;
};


export const usePatientContext = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error();
  }
  return context;
};