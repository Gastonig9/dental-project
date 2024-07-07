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
  prestations: Prestations[];
}

export interface Prestations {
  date: string;
  code: string;
  odontogram: OdontogramType[];
}

export interface OdontogramType {
  toothNum: number;
  part: string;
  ref: string;
}
