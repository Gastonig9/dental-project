import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { DentistRepository } from '../dentists/dentist.repository';
import { SecretaryService } from '../secretary/secretary.service';
// import { RegisterAuthDto } from '../auth/dto/register-auth.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly dentistRepository: DentistRepository,
    private readonly secretaryService: SecretaryService,
  ) {}

  async getUser(id: number): Promise<User> {
    return this.repository.GetUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.GetAllUsers();
  }

  // async addUser(user: RegisterAuthDto): Promise<RegisterAuthDto> {
  //   const response = await this.repository.AddUser(user);
  //   if (user.role_name === ROLES.OWNER || user.role_name === ROLES.ASSOCIATED) {
  //     await this.dentistRepository.addDentist({
  //       notes: '',
  //       userId: response.id,
  //     });
  //   }

  //   if (user.role_name === ROLES.SECRETARY) {
  //     await this.secretaryService.addSecretary({ userId: response.id });
  //   }

  //   return response;
  // }

  async deleteUser(id: number): Promise<User> {
    return this.repository.DeleteUserById(id);
  }
}
