/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { MedicalHistoryRequestDto } from 'src/dtos/record.dto';
import { MedicalHistory } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Public()
@ApiBearerAuth()
@ApiTags('HistorialMedico')
@Controller('/records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('create-record')
  async createRecord(
    @Body() data: MedicalHistoryRequestDto,
    @Res() res: Response,
  ) {
    try {
      const record = await this.recordService.addNewRecord(data);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        record,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<MedicalHistoryRequestDto>,
  ): Promise<MedicalHistory> {
    return this.recordService.updateRecord(id, data);
  }
}
