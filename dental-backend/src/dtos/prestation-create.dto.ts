import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Odontogram, Prestations } from '@prisma/client';

export class OdontogramDto implements Omit<Odontogram, 'id' | 'prestationId'> {
  @ApiProperty()
  toothNumber: number;
  @ApiProperty()
  parts: $Enums.Parts;
  @ApiProperty()
  ref: string;
}

export class PrestationCreateDto implements Omit<Prestations, 'id'> {
  @ApiProperty()
  state: $Enums.PrestationState;
  @ApiProperty()
  patientId: number;
  @ApiProperty()
  date: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  observations: string;
  @ApiProperty({ type: [OdontogramDto] })
  odontogram: OdontogramDto[];
}
