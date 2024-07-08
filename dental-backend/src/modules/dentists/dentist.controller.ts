import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DentistService } from './dentist.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Public()
@ApiBearerAuth()
@ApiTags('Dentistas')
@Controller('/dentist')
export class DentistController {
  constructor(private readonly service: DentistService) {}

  @Get()
  async getAllDentist() {
    const dentists = await this.service.getAllDentist();
    return {
      statusCode: 200,
      dentists,
    };
  }

  @Get('/appointments/:id')
  async getAppointments(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const appointments = await this.service.getAppointmentsByDentistId({
      id: parseInt(id),
    });

    return res.status(HttpStatus.OK).json({
      appointments,
    });
  }
}
