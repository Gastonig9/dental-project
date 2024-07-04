import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

type Update = Omit<User, 'id' | 'password' | 'resetPasswordToken'>;

export class UserUpdateDto implements Partial<Update> {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  dni?: number;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  role_name?: $Enums.EnumRoles;
}
