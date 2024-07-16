import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prestations } from '@prisma/client';

export class OdontogramUpdateDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  toothNumber?: number;
  @ApiProperty()
  parts?: $Enums.Parts[];
  @ApiProperty()
  ref?: string;
}

export class PrestationUpdateDto implements Partial<Prestations> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  state?: $Enums.PrestationState;
  @ApiProperty()
  patientId?: number;
  @ApiProperty()
  date?: string;
  @ApiProperty()
  code?: string;
  @ApiProperty()
  observations?: string;
  @ApiProperty({ type: [OdontogramUpdateDto] })
  odontogram?: OdontogramUpdateDto[];
}
