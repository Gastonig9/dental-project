import { MedicalHistoryRequestDto } from './record.dto';
import { EnumInfoBoolean } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RecordUpdateDto implements Partial<MedicalHistoryRequestDto> {
  @ApiProperty()
  patientId?: number;
  @ApiProperty()
  someDisease?: string;
  @ApiProperty()
  someTreatment?: string;
  @ApiProperty()
  consumeMedicaments?: string;
  @ApiProperty()
  allergyMedicament?: string;
  @ApiProperty()
  operations?: string;
  @ApiProperty({ enum: EnumInfoBoolean })
  smokes?: EnumInfoBoolean;
  @ApiProperty({ enum: EnumInfoBoolean })
  pregnant?: EnumInfoBoolean;
  @ApiProperty()
  attendance?: string;
  @ApiProperty({ enum: EnumInfoBoolean })
  pains?: EnumInfoBoolean;
  @ApiProperty({ enum: EnumInfoBoolean })
  dentalMobility?: EnumInfoBoolean;
  @ApiProperty({ enum: EnumInfoBoolean })
  swollenFace?: EnumInfoBoolean;
  @ApiProperty({ enum: EnumInfoBoolean })
  injuries?: EnumInfoBoolean;
  @ApiProperty()
  observations?: string;
  @ApiProperty()
  takeSomeMedication?: string;
  @ApiProperty()
  blowToTeeth?: string;
}
