import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Context } from 'src/prisma/prisma.context';
import { RegisterAuthDto } from '../auth/dto/login-register.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly context: Context) {}

  async GetAllUsers(): Promise<User[]> {
    return this.context.user.findMany();
  }

  async AddUser(data: RegisterAuthDto): Promise<RegisterAuthDto> {
    return this.context.user.create({ data });
  }

  async GetUserById(id: number): Promise<User> {
    return this.context.user.findFirst({ where: { id } });
  }

  async GetUserByEmail(email: string): Promise<User> {
    return this.context.user.findFirst({ where: { email } });
  }

  async DeleteUserById(id: number): Promise<User> {
    return this.context.user.delete({ where: { id } });
  }
}
