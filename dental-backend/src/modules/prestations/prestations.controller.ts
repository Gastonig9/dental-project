import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PrestationsService } from './prestations.service';
import { ApiBody } from '@nestjs/swagger';
import {
  OdontogramDto,
  PrestationCreateDto,
  PrestationUpdateDto,
} from 'src/dtos';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('api')
export class PrestationsController {
  constructor(private readonly prestationsService: PrestationsService) {}

  @Get('/prestations/getAll-by-patientId')
  async getPrestation(@Query('patientId') patientId: string): Promise<any> {
    const response = await this.prestationsService.getPrestationsByPatientId(
      parseInt(patientId),
    );

    return response;
  }

  @Post('/prestations/create')
  @ApiBody({ type: PrestationCreateDto })
  async addPrestation(@Body() data: PrestationCreateDto) {
    const { odontogram, ...rest } = data;
    const response = await this.prestationsService.createPrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Put('/prestation/update')
  @ApiBody({ type: PrestationUpdateDto })
  async updatePrestation(@Body() data: PrestationUpdateDto) {
    const { odontogram, ...rest } = data;
    const response = await this.prestationsService.updatePrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Put('/odontogram/update')
  @ApiBody({ type: [OdontogramDto] })
  async updateOdontogram(@Body() data: OdontogramDto[]) {
    const response = await this.prestationsService.updateOdontogramArray(data);

    return response;
  }

  @Delete('/prestation/delete/:id')
  async deletePrestation(@Param('id') id: string) {
    await this.prestationsService.deletePrestation(parseInt(id));
  }

  @Delete('/odontogram/delete/:id')
  async deleteOdontogram(@Param('id') id: string) {
    await this.prestationsService.deleteOdontogram(parseInt(id));
  }
}
