import { Injectable } from '@nestjs/common';
import { Context } from 'src/prisma/prisma.context';
import { Odontogram, Prestations } from '@prisma/client';
import {
  OdontogramDto,
  PrestationUpdateDto,
  OdontogramUpdateDto,
  PrestationResponseDto,
} from 'src/dtos';

@Injectable()
export class PrestationRepository {
  constructor(private readonly context: Context) {}

  async getPrestationsById(id: number): Promise<PrestationResponseDto> {
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
  ): Promise<PrestationResponseDto> {
    const prestationCreated = await this.context.prestations.create({
      data: prestation,
    });

    const newOdontograms =
      odontogram?.map((u) => ({
        ...u,
        prestationId: prestationCreated.id,
      })) ?? [];

    await this.context.odontogram.createMany({ data: newOdontograms });

    return await this.getPrestationsById(prestationCreated.id);
  }

  async updatePrestation(
    prestation: Omit<PrestationUpdateDto, 'odontogram'>,
    odontograms?: Partial<Odontogram>[],
  ): Promise<PrestationResponseDto> {
    const prestationUpdated = await this.context.prestations.update({
      where: {
        id: prestation.id,
      },
      data: { ...prestation },
    });

    await this.updateOdontogramInPrestation(odontograms, prestation.id);

    return await this.getPrestationsById(prestationUpdated.id);
  }

  async deletePrestation(id: number): Promise<void> {
    await this.context.prestations.delete({ where: { id } });
  }

  async deleteOdontogram(id: number): Promise<void> {
    await this.context.odontogram.delete({ where: { id } });
  }

  async updateOdontogramArray(odontogramArray: OdontogramUpdateDto[]) {
    for (const odontogram of odontogramArray) {
      const { id, ...data } = odontogram;

      await this.updateOdontogram({ id, data });
    }
  }

  private async updateOdontogramInPrestation(
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

      await this.updateOdontogram({ id, data: rest });
    }
  }

  private async updateOdontogram({
    id,
    data,
  }: {
    id: number;
    data: Partial<OdontogramDto>;
  }) {
    await this.context.odontogram.update({
      where: {
        id,
      },
      data,
    });
  }
}
