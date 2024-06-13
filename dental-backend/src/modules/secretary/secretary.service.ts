import { Injectable } from '@nestjs/common';
import { Secretary, User } from '@prisma/client';
import { SecretaryResponseDto } from 'src/dtos';
import { Context } from 'src/prisma/prisma.context';

@Injectable()
export class SecretaryService {
  constructor(private readonly context: Context) {}

  async getAllSecretaries(): Promise<SecretaryResponseDto[]> {
    return this.context.secretary.findMany({
      select: {
        id: true,
        user: true,
      },
    });
  }

  async addSecretary(data: Omit<Secretary, 'id'>): Promise<Secretary> {
    const response = await this.context.secretary.create({ data });

    return response;
  }
}
