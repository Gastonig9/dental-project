import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppContextModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { DentistModule } from '../dentists/dentist.module';
import { SecretaryModule } from '../secretary/secretary.module';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/utils/email.service';

@Module({
  imports: [
    AppContextModule,
    DentistModule,
    SecretaryModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, EmailService],
  exports: [UserRepository],
})
export class UserModule {}
