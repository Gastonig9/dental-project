import { createContext, useContext, useEffect, useState } from 'react';

interface InitialState {
  paciente: object | null;
  setPaciente: (paciente: object) => void;
}

const PatientContext = createContext<InitialState | null>(null);

export const PatientContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [paciente, setPaciente] = useState<object | null>(null);

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