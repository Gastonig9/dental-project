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
  phone: number;
  floor: string;
  apartment: string;
  locality: string;
  establishment: string;
  socialWork: string;
  services: Prestacion;
}

export interface Prestacion {
  date: string;
  observation?: string;
  code: string;
  specialty: string;
  teeth: ToothDetail[];
}

export interface ToothDetail {
  toothNumber: number;
  position: "center" | "top" | "bottom" | "left" | "right";
  reference: string;
}

export interface ToothState {
  center: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
}
