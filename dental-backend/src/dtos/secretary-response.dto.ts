import { $Enums, Secretary, User } from '@prisma/client';

interface newUser {
  user: User;
}

export class SecretaryResponseDto
  implements newUser, Omit<Secretary, 'userId'>
{
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
    fullname: string;
    password: string;
    role_name: $Enums.EnumRoles;
  };
}
