import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { AppointmentRequestDto } from '../../dtos';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Public()
@ApiTags('Citas')
@Controller('api/appointments')
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

  @Post('/create-appointment')
  @ApiBody({ type: AppointmentRequestDto })
  async addAppointment(
    @Body() data: AppointmentRequestDto,
    @Res() res: Response,
  ) {
    try {
      const appointmentInfo = await this.service.addAppointment(data);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        appointmentInfo,
      });
    } catch (error) {
      return res.json({
        error: error.message,
        message: 'An error ocurred',
        statusCode: error.status,
      });
    }
  }

  @Put('/confirm-appointment/:appointmentId')
  async confirmAppointment(
    @Param('appointmentId') appointmentId: string,
    @Res() res: Response,
  ) {
    try {
      const appointmentConfirmed = await this.service.ConfirmAppointment(
        parseInt(appointmentId),
      );
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'El turno ha sido confirmado',
        appointmentConfirmed,
      });
    } catch (error) {
      return res.json({
        error: error.message,
        message: 'An error ocurred',
        statusCode: error.status,
      });
    }
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string): Promise<Appointment> {
    return await this.service.deleteAppointment(parseInt(id));
  }
}
