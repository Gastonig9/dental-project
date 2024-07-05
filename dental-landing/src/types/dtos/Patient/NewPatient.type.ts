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
  appointments: Appointment[]
  services: Prestacion;
  id?: number;
  odontograma?: string | null;
}

export interface Prestacion {
  date: string;
  observation?: string;
  code: string;
  specialty: string;
}

export interface ToothDetail {
  toothNumber: number;
  reference: string;
  position: string;
}

export interface ToothState {
  center: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
}
