import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrestationRepository } from './prestations.repository';
import {
  OdontogramDto,
  PrestationCreateDto,
  PrestationUpdateDto,
  OdontogramUpdateDto,
  PrestationResponseDto,
} from 'src/dtos';
import { Prestations, $Enums } from '@prisma/client';
import { nomenclaturaFDI } from 'src/enums';

@Injectable()
export class PrestationsService {
  constructor(private readonly repository: PrestationRepository) {}

  async getPrestationsByPatientId(id: number): Promise<PrestationResponseDto> {
    return this.repository.getPrestationsById(id);
  }

  async createPrestation(
    prestation: Omit<PrestationCreateDto, 'odontogram'>,
    odontogram?: OdontogramDto[],
  ): Promise<PrestationResponseDto> {
    this.checkOdontogram(odontogram);
    return this.repository.addPrestation(prestation, odontogram);
  }

  async updatePrestation(
    prestation: PrestationUpdateDto,
    odontogram?: PrestationUpdateDto['odontogram'],
  ): Promise<PrestationResponseDto> {
    this.checkOdontogram(odontogram);
    return this.repository.updatePrestation(prestation, odontogram);
  }

  async deletePrestation(id: number) {
    return this.repository.deletePrestation(id);
  }

  async deleteOdontogram(id: number) {
    return this.repository.deleteOdontogram(id);
  }

  async updateOdontogramArray(odontogram: OdontogramUpdateDto[]): Promise<any> {
    this.checkOdontogram(odontogram);

    return this.repository.updateOdontogramArray(odontogram);
  }

  private checkOdontogram(odontogram: Partial<OdontogramDto>[]) {
    for (const tooth of odontogram) {
      const { parts, toothNumber } = tooth;
      const valid = {
        numberTooth: typeof toothNumber !== 'undefined' ? false : true,
        parts: true,
      };

      if (typeof toothNumber !== 'undefined') {
        nomenclaturaFDI.forEach((side) => {
          if (side.includes(toothNumber)) {
            console.log(toothNumber);

            valid.numberTooth = true;
          }
        });
      }

      parts?.forEach((part) => {
        if ($Enums.Parts[part] === undefined) {
          valid.parts = false;
        }
      });

      if (!valid.numberTooth || !valid.parts) {
        let message = '';

        if (!valid.numberTooth)
          message += 'numero no esperado dentro de nomenclatura FDI ';

        if (!valid.parts) message += ',parte del diente no aceptada';

        throw new NotAcceptableException(message);
      }
    }
  }
}
