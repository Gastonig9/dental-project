import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class UserRequestDto implements Omit<User, 'id'> {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role_name: $Enums.EnumRoles;
}
