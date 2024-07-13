/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';


export class UpdateAppointmentDto {
    @ApiProperty()
    @IsNumber()
    dentistId: number;

    @ApiProperty()
    @IsNumber()
    patientId: number;

    @ApiProperty()
    @IsDateString()
    date: Date;
}