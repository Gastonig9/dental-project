import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UNION_ROLES } from 'src/types';
import { DentistRepository } from '../dentists/dentist.repository';
import { SecretaryService } from '../secretary/secretary.service';
import { ROLES } from '../../enums/roles.enum';
import { AuthService } from '../auth/auth.service';
import { UserAuthResponseDto, UserLoginDto, UserRegisterDto } from 'src/dtos';
import { RequestResetPasswordDto, ResetPasswordDto } from 'src/dtos/user';
import { EmailService } from 'src/utils/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dentistRepository: DentistRepository,
    private readonly secretaryService: SecretaryService,
    private readonly authService: AuthService,
    private readonly mailService: EmailService,
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
      throw new UnauthorizedException('Email y/o Contraseña incorrectos');

    const { id, password: hashPassword, ...userWithoutId } = userExist;

    const isEqual = await this.authService.comparePassword({
      hashPassword,
      plainPassword: user.password,
    });

    if (!isEqual)
      throw new UnauthorizedException('Email y/o Contraseña incorrectos');

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
    const user = await this.userRepository.GetUserById(id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.GetAllUsers();
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.DeleteUserById(id);

    if (!user) throw new NotFoundException('usuario no encontrado');

    return user;
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { email } = requestResetPasswordDto;
    const user: User = await this.userRepository.GetUserByEmail(email);

    if (!user) throw new NotFoundException('usuario no encontrado');

    const resetPasswordToken = crypto.randomUUID().toString();

    await this.userRepository.UpdateUser({ resetPasswordToken }, user.id);
    // Send email
    await this.mailService.sendResetPasswordEmail({
      email,
      resetPasswordToken,
    });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User =
      await this.userRepository.GetUserByResetPasswordToken(resetPasswordToken);

    const hashPassword = await this.authService.hashPassword(password);

    await this.userRepository.UpdateUser(
      { password: hashPassword, resetPasswordToken: null },
      user.id,
    );
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
