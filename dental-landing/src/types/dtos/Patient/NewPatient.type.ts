import { Appointment } from "../appointment/appointment.type";

export interface Patient {
  name: string;
  surname: string;
  dni: number;
  age: number;
  nationality: string;
  gender: string;
  birthDate: string;
  pEmail: string;
  street: string;
  addressNumber: number;
  phone: string;
  floor: string;
  apartment: string;
  locality: string;
  establishment: string;
  socialWork: string;
  id?: number;
  appointments: Appointment[];
  prestations: Prestations[];
}

export interface Prestations {
  id?: number;
  date: string;
  code: string;
  observations?: string;
  state: string;
  odontogram: OdontogramType[];
}

export interface OdontogramType {
  toothNumber: number;
  parts: [string];
  ref: string;
}

export interface PrestationRequest {
  state: string;
  patientId: number;
  date: string;
  code: string;
  observations: string;
  odontogram: {
    toothNumber: number;
    parts: string[];
    ref: string;
  }[];
}
