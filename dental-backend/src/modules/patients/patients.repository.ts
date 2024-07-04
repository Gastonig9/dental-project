/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  Appointment,
  MedicalHistory,
  Odontogram,
  Patient,
  Prestations,
} from '@prisma/client';
import {
  OdontogramDto,
  PatientRequestDto,
  PrestationCreateDto,
} from 'src/dtos';
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
  ): Promise<any> {
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
      include: {
        appointments: true,
        medicalHistories: true,
      },
    });
  }

  async getPrestationsById(id: number) {
    return this.context.prestations.findMany({
      where: { patientId: id },
      include: {
        odontogram: true,
      },
    });
  }

  async addPrestation(
    prestation: Omit<Prestations, 'id'>,
    odontogram: OdontogramDto[],
  ) {
    console.log(prestation);

    const prestationCreated = await this.context.prestations.create({
      data: prestation,
    });

    const newOdontograms = odontogram.map((u) => ({
      ...u,
      prestationId: prestationCreated.patientId,
    }));

    await this.context.odontogram.createMany({ data: newOdontograms });

    return this.getPrestationsById(prestationCreated.id);
  }

  async getPatientByDni(dni: number): Promise<Patient | null> {
    return this.context.patient.findFirst({ where: { dni } });
  }

  async updatePatientById(
    id: number,
    data: Partial<Patient>,
  ): Promise<Patient | null> {
    return this.context.patient.update({
      where: {
        id,
      },
      data: { ...data },
    });
  }
}
