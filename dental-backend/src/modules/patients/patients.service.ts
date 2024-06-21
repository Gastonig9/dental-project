/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { faker } from "@faker-js/faker";
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

  async addMultiplePatients(patients: PatientRequestDto[]): Promise<Patient[]> {
    const addedPatients: Patient[] = [];
    for (const patient of patients) {
      const addedPatient = await this.addPatient(patient);
      addedPatients.push(addedPatient);
    }
    return addedPatients;
  }

  async mockPatients() {
    const mockPatients: PatientRequestDto[] = [];

    for (let i = 0; i < 10; i++) {
      const newMockPatient: PatientRequestDto = {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        gender: 'Male',
        pEmail: faker.internet.exampleEmail(),
        dni: faker.number.int({ min: 1000000, max: 40000000 }), // Assuming DNI is a 8-digit number
        phone: 42421212,
        adress: faker.location.streetAddress(),
      };
      mockPatients.push(newMockPatient);
    }

    return this.addMultiplePatients(mockPatients);
  }

  async getAllPatients(dni?: string, name?: string, gender?: string): Promise<Patient[]> {
    try {
      const dniNumber = dni ? parseInt(dni) : undefined;
      return this.repository.getAllPatients(dniNumber, name, gender);
    } catch (error) {
      throw error;
    }
  }

  async getPatientByDni(dni: number): Promise<Patient> {
    return this.repository.getPatientByDni(dni);
  }
}
