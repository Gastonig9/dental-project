/* eslint-disable prettier/prettier */
import { $Enums } from '@prisma/client';
import { IsString, IsNumber, IsDateString, IsEnum, IsEmail } from 'class-validator';

export class AppointmentRequestDto {
  @IsString()
  @IsEnum($Enums.AppointmentState)
  state: $Enums.AppointmentState;

  @IsString()
  results: string;

  @IsNumber()
  dentistId: number;

  @IsNumber()
  patientId: number;

  @IsDateString()
  date: Date;

  @IsString()
  reason: string

  //PATIENT
  @IsString()
  patientName?: string;

  @IsString()
  @IsEmail()
  patientEmail?: string;

  @IsString()
  patientSurname?: string;

  @IsString()
  patientGender?: string;

  @IsString()
  patientAdress?: string;

  @IsNumber()
  patientDni?: number;

  @IsNumber()
  patientPhone?: number;
}