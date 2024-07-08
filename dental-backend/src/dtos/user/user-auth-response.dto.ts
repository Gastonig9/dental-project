import { User } from '@prisma/client';

export class UserAuthResponseDto {
  token: string;
  user: Omit<User, 'id' | 'password' | 'resetPasswordToken'>;
  RoleObject: object;
}
