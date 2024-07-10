import { Injectable } from '@nestjs/common';
import { PrestationRepository } from './prestations.repository';
import {
  OdontogramDto,
  PrestationCreateDto,
  PrestationUpdateDto,
} from 'src/dtos';
import { Odontogram, Prestations } from '@prisma/client';

@Injectable()
export class PrestationsService {
  constructor(private readonly repository: PrestationRepository) {}

  async getPrestationsByPatientId(id: number): Promise<Prestations[]> {
    return this.repository.getPrestationsById(id);
  }

  async createPrestation(
    prestation: Omit<PrestationCreateDto, 'odontogram'>,
    odontogram?: OdontogramDto[],
  ): Promise<any> {
    return this.repository.addPrestation(prestation, odontogram);
  }

  async updatePrestation(
    prestation: PrestationUpdateDto,
    odontogram?: PrestationUpdateDto['odontogram'],
  ): Promise<any> {
    return this.repository.updatePrestation(prestation, odontogram);
  }

  async deletePrestation(id: number) {
    return this.repository.deletePrestation(id);
  }

  async deleteOdontogram(id: number) {
    return this.repository.deleteOdontogram(id);
  }

  async updateOdontogramArray(odontogram: OdontogramDto[]): Promise<void> {
    return this.repository.updateOdontogramArray(odontogram);
  }
}
