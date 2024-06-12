import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Patient } from '@prisma/client';
import { PatientRequestDto, PatientResponseDto } from 'src/dtos';
import { PatientService } from './patients.service';

@Controller('/patient')
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Post()
  @ApiBody({ type: PatientRequestDto })
  async addPatient(@Body() data: PatientRequestDto): Promise<Patient> {
    return this.service.addPatient(data);
  }

  @Get()
  async getAllPatients(): Promise<Patient[]> {
    return await this.service.getAllPatients();
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<PatientResponseDto> {
    return await this.service.getPatient(parseInt(id));
  }
}
