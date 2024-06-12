import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PatientRepository } from './patients.repository';
import { PatientRequestDto, PatientResponseDto } from 'src/dtos';

@Injectable()
export class PatientService {
  constructor(private readonly repository: PatientRepository) {}

  async addPatient(patient: PatientRequestDto): Promise<Patient> {
    return this.repository.addPatient(patient);
  }

  async getPatient(id: number): Promise<PatientResponseDto> {
    return this.repository.getPatientById(id);
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.repository.getAllPatients();
  }
}
