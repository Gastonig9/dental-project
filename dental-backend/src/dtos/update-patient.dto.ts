import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';

export class UpdatePatientDto implements Partial<Patient> {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  surname?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  pEmail?: string;

  @ApiProperty()
  dni?: number;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  floor?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  nationality?: string;

  @ApiProperty()
  locality?: string;

  @ApiProperty()
  establishment?: string;

  @ApiProperty()
  socialWork?: string;

  @ApiProperty()
  apartment?: string;

  @ApiProperty()
  birthDate?: string;

  @ApiProperty()
  age?: number;
}
