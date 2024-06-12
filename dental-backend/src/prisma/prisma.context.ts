import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Context extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      return await this.$connect();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
