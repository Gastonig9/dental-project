import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { AppointmentRequestDto } from '../../dtos';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Public()
@ApiTags('Citas')
@Controller('/appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get()
  async getAllAppointments(): Promise<Appointment[]> {
    return await this.service.getAllAppointments();
  }

  @Get(':id')
  async getAppointment(@Param('id') id: string): Promise<Appointment> {
    return await this.service.getAppointment(parseInt(id));
  }

  @Post()
  @ApiBody({ type: AppointmentRequestDto })
  async addAppointment(
    @Body() data: AppointmentRequestDto,
  ): Promise<Appointment> {
    return await this.service.addAppointment(data);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string): Promise<Appointment> {
    return await this.service.deleteAppointment(parseInt(id));
  }
}
