/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PatientRepository } from './patients.repository';
import { PatientRequestDto } from 'src/dtos';

@Injectable()
export class PatientService {
  constructor(private readonly repository: PatientRepository) { }

  async addPatient(patient: PatientRequestDto): Promise<Patient> {
    return this.repository.addPatient(patient);
  }

  async getPatient(id: number): Promise<Patient> {
    return this.repository.getPatientById(id);
  }

  async getAllPatients(dni?: string, name?: string, gender?: string): Promise<Patient[]> {
    try {
      const dniNumber = dni ? parseInt(dni) : undefined;
      return this.repository.getAllPatients(dniNumber, name, gender);
    } catch (error) {
      throw error
    }

  }

  async getPatientByDni(dni: number): Promise<Patient> {
    return this.repository.getPatientByDni(dni);
  }
}
