import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';

export class PatientResponseDto implements Omit<Patient, 'id'> {
  age: number;
  floor: string;
  street: string;
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
  phone: number;
  pEmail: string;
  odontograma: string | null;
  @ApiProperty()
  appointmentList: {
    date: Date;
    dentist: {
      name: string;
      surname: string;
    };
  }[];
}
