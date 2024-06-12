import { Module } from '@nestjs/common';
import { AppContextModule } from 'src/prisma/prisma.module';
import { DentistController } from './dentist.controller';
import { DentistRepository } from './dentist.repository';
import { DentistService } from './dentist.service';

@Module({
  imports: [AppContextModule],
  controllers: [DentistController],
  providers: [DentistRepository, DentistService],
})
export class DentistModule {}
