import { $Enums, User } from '@prisma/client';

export class UserResponseDto
  implements
    Omit<
      User,
      'password' | 'resetPasswordToken' | 'failedAttempts' | 'isLocked'
    >
{
  id: number;
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  role_name: $Enums.EnumRoles;
}
