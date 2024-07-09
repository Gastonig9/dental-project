/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Odontogram, Patient, Prestations } from '@prisma/client';
import { OdontogramDto, PatientRequestDto, PatientResponseDto } from 'src/dtos';
import { PrestationUpdateDto } from 'src/dtos/prestation-update.dto';
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
        prestations: true,
      },
    });
  }

  async getPatientById(id: number): Promise<PatientResponseDto> {
    return this.context.patient.findFirst({
      where: {
        id,
      },
      include: {
        appointments: true,
        medicalHistories: true,
        prestations: true,
      },
    });
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
    const prestationCreated = await this.context.prestations.create({
      data: prestation,
    });

    const newOdontograms = odontogram.map((u) => ({
      ...u,
      prestationId: prestationCreated.id, // Cambiado de patientId a id
    }));

    await this.context.odontogram.createMany({ data: newOdontograms });

    return this.getPrestationsById(prestationCreated.id);
  }

  async updatePrestation(
    prestation: Omit<PrestationUpdateDto, 'odontogram'>,
    odontograms?: Partial<Odontogram>[],
  ): Promise<Prestations> {
    console.log(prestation);

    const prestationUpdated = await this.context.prestations.update({
      where: {
        id: prestation.id,
      },
      data: { ...prestation },
    });

    this.updateOdontogram(odontograms, prestation.id);

    return prestationUpdated;
  }

  async deletePrestation(id: number): Promise<void> {
    await this.context.prestations.delete({ where: { id } });
  }

  private async updateOdontogram(
    odontogram: Partial<Odontogram>[],
    prestationId: number,
  ) {
    if (!odontogram) return;
    for (const odonto of odontogram) {
      const { id, ...rest } = odonto;

      if (typeof id === 'undefined') {
        await this.context.odontogram.create({
          data: {
            parts: rest.parts ?? ['center'],
            ref: rest.ref ?? '',
            toothNumber: rest.toothNumber,
            prestationId: prestationId,
          },
        });
        return;
      }

      await this.context.odontogram.update({
        where: {
          id,
        },
        data: { ...rest },
      });
    }
  }
}
