import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Patient } from '@prisma/client';
import { PatientRequestDto } from 'src/dtos';
import { PatientService } from './patients.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Public()
@ApiTags('Pacientes')
@Controller('/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiBody({ type: PatientRequestDto })
  async addPatient(@Body() data: PatientRequestDto): Promise<Patient> {
    try {
      return this.patientService.addPatient(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-patients')
  async getAllPatients(
    @Query('dni') dni?: string,
    @Query('name') name?: string,
    @Query('gender') gender?: string,
  ): Promise<{ statusCode: number; patients: Patient[] }> {
    const patients = await this.patientService.getAllPatients(
      dni,
      name,
      gender,
    );
    return {
      statusCode: 200,
      patients,
    };
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<Patient> {
    return await this.patientService.getPatient(parseInt(id));
  }

  // Endpoint temporal para mockear pacientes
  @Post('mock-patients')
  async mockPatients(): Promise<{ statusCode: number; patients: Patient[] }> {
    const patients = await this.patientService.mockPatients();
    return {
      statusCode: HttpStatus.OK,
      patients,
    };
  }
}
