/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param, Query, Res, HttpStatus } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Patient } from '@prisma/client';
import { PatientRequestDto, PatientResponseDto } from 'src/dtos';
import { PatientService } from './patients.service';
import { Response } from 'express';

@Controller('/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @ApiBody({ type: PatientRequestDto })
  async addPatient(@Body() data: PatientRequestDto): Promise<Patient> {
    return this.patientService.addPatient(data);
  }

  @Get('get-patients')
  async getAllPatients(
    @Query('dni') dni?: string,
    @Query('name') name?: string,
    @Query('gender') gender?: string
  ): Promise<{ statusCode: number; patients: Patient[] }> {
    const patients = await this.patientService.getAllPatients(dni, name, gender);
    return {
      statusCode: 200,
      patients,
    };
  }

  @Get(':id')
  async getPatient(@Param('id') id: string): Promise<Patient> {
    return await this.patientService.getPatient(parseInt(id));
  }
}
