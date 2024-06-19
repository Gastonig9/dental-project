import { User } from '@prisma/client';

export class ResponseAuthDto {
  token: string;
  user: Omit<User, 'id' | 'password'>;
}
