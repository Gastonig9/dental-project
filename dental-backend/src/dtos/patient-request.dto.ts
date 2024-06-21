import { Patient } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PatientRequestDto implements Omit<Patient, 'id'> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  adress: string;

  @ApiProperty()
  pEmail: string;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dni: number;
}
