/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Param, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { RecordService } from './record.service';
import { MedicalHistoryRequestDto } from 'src/dtos/record.dto';
import { MedicalHistory } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Public()
@ApiBearerAuth()
@ApiTags('HistorialMedico')
@Controller('/records')
export class RecordController {
    constructor(private readonly recordService: RecordService) {}

    @Post('create-record')
    async createRecord(@Body() data: MedicalHistoryRequestDto, @Res() res: Response) {
      try {
        const record = await this.recordService.addNewRecord(data);
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          record,
        });
      } catch (error) {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An error occurred';
  
        if (error instanceof PrismaClientValidationError) {
          status = HttpStatus.BAD_REQUEST;
          message = "Uno o mas campos son incorrectos";
        }
  
        return res.status(status).json({
          error: message,
          message: 'Ocurrio un error',
          statusCode: status,
        });
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
