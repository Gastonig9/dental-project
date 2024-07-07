import { Odontogram, Patient, Prestations } from '@prisma/client';

type patient = Omit<Patient, 'phone'> & { phone: string };

export class PatientResponseDto implements patient {
  id: number;
  age: number;
  floor: string;
  street: string;
  addressNumber: number;
  nationality: string;
  locality: string;
  establishment: string;
  socialWork: string;
  apartment: string;
  birthDate: string;
  name: string;
  surname: string;
  gender: string;
  dni: number;
  phone: string;
  pEmail: string;
  // odontograma: Prestations[];
  // appointments: Appointment[];
}
