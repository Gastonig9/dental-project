import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UNION_ROLES } from 'src/types';
import { DentistRepository } from '../dentists/dentist.repository';
import { SecretaryService } from '../secretary/secretary.service';
import { ROLES } from '../../enums/roles.enum';
import { AuthService } from '../auth/auth.service';
import { UserAuthResponseDto, UserLoginDto, UserRegisterDto } from 'src/dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dentistRepository: DentistRepository,
    private readonly secretaryService: SecretaryService,
    private readonly authService: AuthService,
  ) {}

  async register(user: UserRegisterDto): Promise<User> {
    user.password = await this.authService.hashPassword(user.password);

    const userResponse = await this.userRepository.AddUser(user);

    const response = await this.AddUserType[user.role_name](userResponse);

    return response;
  }

  async login(user: UserLoginDto): Promise<UserAuthResponseDto> {
    const userExist = await this.userRepository.GetUserByEmail(user.email);

    if (!userExist)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    const { id, password: hashPassword, ...userWithoutId } = userExist;

    const isEqual = await this.authService.comparePassword({
      hashPassword,
      plainPassword: user.password,
    });

    if (!isEqual)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.authService.generateToken({
      id,
      role: userWithoutId.role_name,
    });

    return {
      token,
      user: userWithoutId,
    };
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.GetUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.GetAllUsers();
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.DeleteUserById(id);
  }

  private AddUserType: {
    [key in UNION_ROLES]: (data: User) => Promise<any>;
  } = {
    [ROLES.OWNER]: async (data: User) => {
      const res = await this.dentistRepository.addDentist({
        notes: '',
        userId: data.id,
        fullname: data.fullname,
      });
      return res;
    },
    [ROLES.SECRETARY]: async (data: User) => {
      const res = await this.secretaryService.addSecretary({
        userId: data.id,
      });
      return res;
    },
    [ROLES.ASSOCIATED]: async (data: User) => {
      const res = await this.dentistRepository.addDentist({
        notes: '',
        userId: data.id,
        fullname: data.fullname,
      });
      return res;
    },
    [ROLES.CLIENT]: async (data: User) => {
      // const res = await this.userRepository.AddUser({
      //   email: data.email,
      //   password: data.password,
      //   role_name: data.role_name,
      //   username: data.username,
      //   fullname: data.fullname,
      // });
      return data;
    },
  };
}
