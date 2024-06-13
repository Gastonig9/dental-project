import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppContextModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { DentistModule } from '../dentists/dentist.module';
import { SecretaryModule } from '../secretary/secretary.module';

@Module({
  imports: [AppContextModule, DentistModule, SecretaryModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
