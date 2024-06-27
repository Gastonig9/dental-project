import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class AppointmentRequestDto {
  @ApiProperty()
  @IsString()
  @IsEnum($Enums.AppointmentState)
  state: $Enums.AppointmentState;

  @ApiProperty()
  @IsString()
  results: string;

  @ApiProperty()
  @IsNumber()
  dentistId: number;

  @ApiProperty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsString()
  odontograma: string;

  // //PATIENT
  // @IsString()
  // patientName?: string;

  // @IsString()
  // @IsEmail()
  // patientEmail?: string;

  // @IsString()
  // patientSurname?: string;

  // @IsString()
  // patientGender?: string;

  // @IsString()
  // patientAdress?: string;

  // @IsNumber()
  // patientDni?: number;

  // @IsNumber()
  // patientPhone?: number;
}
