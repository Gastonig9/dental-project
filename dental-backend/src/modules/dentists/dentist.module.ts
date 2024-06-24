import { Module, forwardRef } from '@nestjs/common';
import { AppContextModule } from 'src/prisma/prisma.module';
import { DentistController } from './dentist.controller';
import { DentistRepository } from './dentist.repository';
import { DentistService } from './dentist.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AppContextModule, forwardRef(() => AuthModule)],
  controllers: [DentistController],
  providers: [DentistRepository, DentistService],
  exports: [DentistRepository, DentistService],
})
export class DentistModule {}
