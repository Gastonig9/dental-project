import { Module, forwardRef } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { AppContextModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { RecordRepository } from './record.repository';

@Module({
  imports: [AppContextModule, forwardRef(() => AuthModule)],
  controllers: [RecordController],
  providers: [RecordRepository, RecordService],
  exports: [RecordRepository, RecordService],
})
export class RecordModule {}
