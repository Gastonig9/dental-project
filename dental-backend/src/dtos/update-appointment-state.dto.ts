/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';


export class UpdateAppointmentStateDto {
    appointmentId: number

    @ApiProperty()
    @IsString()
    @IsEnum($Enums.AppointmentState)
    state: $Enums.AppointmentState;
}