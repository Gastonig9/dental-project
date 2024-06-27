import { Controller, Get } from '@nestjs/common';
import { Dentist } from '@prisma/client';
import { DentistService } from './dentist.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Public()
@ApiBearerAuth()
@ApiTags('Dentistas')
@Controller('/dentist')
export class DentistController {
  constructor(private readonly service: DentistService) {}

  @Get()
  async getAllDentist(): Promise<Dentist[]> {
    return await this.service.getAllDentist();
  }
}
