import { Controller, Get } from '@nestjs/common';
import { Dentist } from '@prisma/client';
import { DentistService } from './dentist.service';

@Controller('/dentist')
export class DentistController {
  constructor(private readonly service: DentistService) {}

  // @Post()
  // @ApiBody({ type: DentistDto })
  // async addDentist(@Body() data: DentistDto): Promise<Dentist> {
  //   return await this.service.addDentist(data);
  // }

  @Get()
  async getAllDentist(): Promise<Dentist[]> {
    return await this.service.getAllDentist();
  }
}
