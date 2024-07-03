import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Patient } from '@prisma/client';
import { PatientRequestDto } from 'src/dtos';
import { PatientService } from './patients.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { UpdatePatientDto } from 'src/dtos';

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
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'dni', required: false })
  @ApiQuery({ name: 'name', required: false })
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

  @Put(':id')
  @ApiBody({ type: UpdatePatientDto })
  async updatePatient(
    @Param('id') id: string,
    @Body() data: Partial<Patient>,
  ): Promise<Patient> {
    return await this.patientService.updatePatientById(parseInt(id), data);
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
