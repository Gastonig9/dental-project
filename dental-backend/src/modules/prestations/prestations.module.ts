import { forwardRef, Module } from '@nestjs/common';
import { PrestationsService } from './prestations.service';
import { PrestationsController } from './prestations.controller';
import { PrestationRepository } from './prestations.repository';
import { AppContextModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AppContextModule, forwardRef(() => AuthModule)],
  controllers: [PrestationsController],
  providers: [PrestationsService, PrestationRepository],
})
export class PrestationsModule {}
