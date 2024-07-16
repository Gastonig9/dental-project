import { Odontogram, Prestations } from '@prisma/client';

export type PrestationResponseDto = (Prestations & {
  odontogram: Odontogram[];
})[];
