/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { AppointmentRequestDto } from '../../dtos';
import { Response } from 'express';

@Controller('api/appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) { }

  @Get()
  async getAllAppointments(): Promise<Appointment[]> {
    return await this.service.getAllAppointments();
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string): Promise<Appointment> {
    return await this.service.getAppointment(parseInt(id));
  }

  @Post('/create-appointment')
  @ApiBody({ type: AppointmentRequestDto })
  async addAppointment(@Body() data: AppointmentRequestDto, @Res() res: Response) {
    try {
      const appointmentInfo = await this.service.addAppointment(data);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        appointmentInfo
      });
    } catch (error) {
      return res.json({
        error: error.message,
        message: "An error ocurred",
        statusCode: error.status
      });
    }

  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string): Promise<Appointment> {
    return await this.service.deleteAppointment(parseInt(id));
  }
}
