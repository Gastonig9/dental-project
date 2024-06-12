import { Patient } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PatientRequestDto implements Omit<Patient, 'id'> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  dni: number;
}
