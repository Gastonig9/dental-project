import { Dentist } from '@prisma/client';

export class DentistDto implements Omit<Dentist, 'id'> {
  notes: string;
  userId: number;
  fullname: string;
}
