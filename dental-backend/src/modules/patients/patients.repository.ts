/* eslint-disable prettier/prettier */
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

  async getAllPatients(
    dni?: number,
    name?: string,
    gender?: string,
  ): Promise<Patient[]> {
    const where: any = {};

    if (dni) {
      where.dni = dni;
    }
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (gender) {
      where.gender = {
        contains: gender,
        mode: 'insensitive',
      };
    }

    return this.context.patient.findMany({
      where,
      include: {
        appointments: true,
        medicalHistories: true,
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
        pEmail: true,
        adress: true,
        gender: true,
        dni: true,
        appointments: {
          select: {
            date: true,
            dentist: {
              select: {
                user: true,
              },
            },
          },
        },
        medicalHistories: true,
      },
    });
  }

  async getPatientByDni(dni: number): Promise<Patient | null> {
    return this.context.patient.findFirst({ where: { dni } });
  }
}
