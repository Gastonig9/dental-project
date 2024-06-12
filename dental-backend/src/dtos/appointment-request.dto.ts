import { $Enums, Appointment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentRequestDto implements Omit<Appointment, 'id'> {
  @ApiProperty()
  state: $Enums.AppointmentState;

  @ApiProperty()
  results: string;

  @ApiProperty()
  dentistId: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  date: Date;
}
