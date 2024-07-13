import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Context } from 'src/prisma/prisma.context';
import { UserRegisterDto, UserResponseDto } from 'src/dtos';

@Injectable()
export class UserRepository {
  constructor(private readonly context: Context) {}

  async GetAllUsers(): Promise<UserResponseDto[]> {
    return this.context.user.findMany({
      select: {
        dni: true,
        email: true,
        firstName: true,
        lastName: true,
        role_name: true,
        id: true,
      },
    });
  }

  async AddUser(data: UserRegisterDto): Promise<User> {
    return this.context.user.create({ data });
  }

  async UpdateUser(data: Partial<User>, id: number): Promise<User> {
    const response = await this.context.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return response;
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

  async GetUserByResetPasswordToken(resetPasswordToken: string) {
    return this.context.user.findFirst({ where: { resetPasswordToken } });
  }
}
