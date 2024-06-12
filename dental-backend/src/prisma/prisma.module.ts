import { Module } from '@nestjs/common';
import { Context } from './prisma.context';

@Module({
  providers: [Context],
  exports: [Context],
})
export class AppContextModule {}
