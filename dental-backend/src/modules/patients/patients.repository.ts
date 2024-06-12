import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PatientRequestDto } from 'src/dtos';
import { Context } from 'src/prisma/prisma.context';

@Injectable()
export class PatientRepository {
  constructor(private readonly context: Context) {}

  async addPatient(data: PatientRequestDto): Promise<Patient> {
    return this.context.patient.create({ data });
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.context.patient.findMany({
      include: {
        appointments: true,
      },
    });
  }

  async getPatientById(id: number): Promise<any> {
    return this.context.patient.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        surname: true,
        gender: true,
        dni: true,
        appointments: {
          select: {
            date: true,
            dentist: {
              select: {
                name: true,
                surname: true,
              },
            },
          },
        },
      },
    });
  }
}
