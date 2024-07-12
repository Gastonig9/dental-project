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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  PrestationCreateDto,
  PrestationUpdateDto,
  OdontogramUpdateDto,
  PrestationResponseDto,
} from 'src/dtos';
import { Public } from 'src/decorators/public.decorator';

@Public()
@ApiTags("Prestations")
@Controller('api')
export class PrestationsController {
  constructor(private readonly prestationsService: PrestationsService) {}

  @Get('/prestations/getAll-by-patientId')
  async getPrestation(
    @Query('patientId') patientId: string,
  ): Promise<PrestationResponseDto> {
    const response = await this.prestationsService.getPrestationsByPatientId(
      parseInt(patientId),
    );

    return response;
  }

  @Post('/prestations/create')
  @ApiBody({ type: PrestationCreateDto })
  async addPrestation(
    @Body() data: PrestationCreateDto,
  ): Promise<PrestationResponseDto> {
    const { odontogram, ...rest } = data;
    const response = await this.prestationsService.createPrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Put('/prestation/update')
  @ApiBody({ type: PrestationUpdateDto })
  async updatePrestation(
    @Body() data: PrestationUpdateDto,
  ): Promise<PrestationResponseDto> {
    const { odontogram, ...rest } = data;
    const response = await this.prestationsService.updatePrestation(
      rest,
      odontogram,
    );

    return response;
  }

  @Put('/odontogram/update')
  @ApiBody({ type: [OdontogramUpdateDto] })
  async updateOdontogram(@Body() data: OdontogramUpdateDto[]) {
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
