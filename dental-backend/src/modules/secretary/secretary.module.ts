import { Module } from '@nestjs/common';
import { SecretaryController } from './secretary.controller';
import { AppContextModule } from 'src/prisma/prisma.module';
import { SecretaryService } from './secretary.service';

@Module({
  imports: [AppContextModule],
  controllers: [SecretaryController],
  providers: [SecretaryService],
  exports: [SecretaryService],
})
export class SecretaryModule {}
