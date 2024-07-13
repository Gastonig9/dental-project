/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { Patient, Prestations } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PatientRepository } from './patients.repository';
import { PatientRequestDto, PatientResponseDto } from 'src/dtos';

@Injectable()
export class PatientService {
  constructor(private readonly repository: PatientRepository) {}

  async addPatient(patient: PatientRequestDto): Promise<Patient> {
    try {
      const response = await this.repository.getPatientByDni(patient.dni);

      if (response) {
        throw new ConflictException('El dni ya se encuentra registrado');
      }

      return this.repository.addPatient(patient);
    } catch (error) {
      throw error;
    }
  }

  async getPatient(id: number): Promise<PatientResponseDto> {
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
        phone: '424212',
        age: 9,
        apartment: 'nose',
        addressNumber: 400,
        birthDate: '/20/3/1994',
        establishment: 'e',
        floor: '3',
        locality: 'argentina',
        nationality: 'argentina',
        socialWork: 'nose',
        street: 'Colon',
      };
      mockPatients.push(newMockPatient);
    }

    return this.addMultiplePatients(mockPatients);
  }

  async getAllPatients(
    dni?: string,
    name?: string,
    gender?: string,
  ): Promise<Patient[]> {
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

  async updatePatientById(
    id: number,
    patient: Partial<Patient & { prestations: Prestations[] }>,
  ): Promise<Patient> {
    const { prestations, ...rest } = patient;
    return this.repository.updatePatientById(id, rest);
  }
}
