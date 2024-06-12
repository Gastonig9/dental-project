import { $Enums, Dentist } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DentistDto implements Omit<Dentist, 'id'> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  level: $Enums.DentistLevel;
}
