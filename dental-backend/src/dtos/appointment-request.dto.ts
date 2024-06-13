import { $Enums, Appointment } from '@prisma/client';
import { IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class AppointmentRequestDto implements Omit<Appointment, 'id'> {
  @IsString()
  @IsEnum($Enums)
  state: $Enums.AppointmentState;

  @IsString()
  results: string;

  @IsNumber()
  dentistId: number;

  @IsNumber()
  patientId: number;

  @IsDateString()
  date: Date;

  @IsNumber()
  dni: number;
}
