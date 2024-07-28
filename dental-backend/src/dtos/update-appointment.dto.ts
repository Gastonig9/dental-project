import { ApiProperty } from '@nestjs/swagger';
import {  IsDateString, IsNumber } from 'class-validator';


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