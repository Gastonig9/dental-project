import { Secretary } from '@prisma/client';
import { UserRegisterDto } from './user';

interface newUser {
  user: UserRegisterDto;
}

export class SecretaryResponseDto
  implements newUser, Omit<Secretary, 'userId'>
{
  id: number;
  user: UserRegisterDto;
}
