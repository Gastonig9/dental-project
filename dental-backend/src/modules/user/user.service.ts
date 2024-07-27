import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  PreconditionFailedException,
  ConflictException,
  NotAcceptableException,
  NotImplementedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UNION_ROLES } from 'src/types';
import { DentistRepository } from '../dentists/dentist.repository';
import { SecretaryService } from '../secretary/secretary.service';
import { ROLES } from '../../enums/roles.enum';
import { AuthService } from '../auth/auth.service';
import { UserAuthResponseDto, UserLoginDto, UserRegisterDto } from 'src/dtos';
import {
  RequestResetPasswordDto,
  ResetPasswordDto,
  UserResponseDto,
  UserUpdateDto,
} from 'src/dtos/user';
import { EmailService } from 'src/utils/email.service';

@Injectable()
export class UserService {
  private readonly MAX_FAILED_ATTEMPTS = 5;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly dentistRepository: DentistRepository,
    private readonly secretaryService: SecretaryService,
    private readonly authService: AuthService,
    private readonly mailService: EmailService,
  ) {}

  async register(user: UserRegisterDto): Promise<User> {
    user.password = await this.authService.hashPassword(user.password);

    if (!this.validateEmail(user.email)) {
      throw new NotAcceptableException(
        'El campo email debe contener un email valido',
      );
    }

    const checkUserEmail = await this.userRepository.GetUserByEmail(user.email);
    const checkUserDni = await this.userRepository.GetUserByDni(user.dni);

    if (checkUserDni || checkUserEmail) {
      const message = `Ya existe un usuario para el o los campos: ${checkUserDni ? 'DNI' : ''} ${checkUserEmail ? 'EMAIL' : ''}`;

      throw new ConflictException(message);
    }

    const userResponse = await this.userRepository.AddUser(user);
    const response = await this.AddUserType[user.role_name](userResponse);

    return response;
  }

  async login(user: UserLoginDto): Promise<UserAuthResponseDto> {
    const userExist = await this.userRepository.GetUserByEmail(user.email);
    const RoleObject = { dentist: {} };

    if (!userExist)
      throw new UnauthorizedException('Email y/o Contraseña incorrectos');

    const {
      id,
      password: hashPassword,
      resetPasswordToken: _reset,
      failedAttempts: _failedAttempts,
      isLocked,
      ...userWithoutId
    } = userExist;

    if (isLocked) {
      throw new PreconditionFailedException(
        'Cuenta bloqueada, solicitar cambio de contraseña',
      );
    }

    const isEqual = await this.authService.comparePassword({
      hashPassword,
      plainPassword: user.password,
    });

    if (!isEqual) {
      await this.handleFailedLoginAttempt(userExist);
      throw new UnauthorizedException(
        'Email y/o Contraseña incorrectos, recuerde que solo cuenta con 5 intentos',
      );
    }

    const token = await this.authService.generateToken({
      id,
      role: userWithoutId.role_name,
    });

    if (
      userExist.role_name === 'OWNER' ||
      userExist.role_name === 'ASSOCIATED'
    ) {
      const dentist = await this.dentistRepository.getDentistByUserId(
        userExist.id,
      );

      RoleObject.dentist = { ...dentist };
    }

    return {
      token,
      user: userWithoutId,
      RoleObject,
    };
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.GetUserById(id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async updateUser(id: number, data: UserUpdateDto): Promise<User> {
    const checkUserEmail = data?.email
      ? await this.userRepository.GetUserByEmail(data?.email)
      : null;
    const checkUserDni = data?.dni
      ? await this.userRepository.GetUserByDni(data?.dni)
      : null;

    const duplicates = [];

    if (checkUserDni && checkUserDni?.id !== id) {
      duplicates.push('DNI');
    }

    if (checkUserEmail && checkUserEmail?.id !== id) {
      duplicates.push('EMAIL');
    }

    if (duplicates.length > 0)
      throw new ConflictException(
        `Ya existe un usuario para el o los campos: ${duplicates.join(', ')}`,
      );

    return this.userRepository.UpdateUser(data, id);
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
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
      {
        password: hashPassword,
        resetPasswordToken: null,
        failedAttempts: 0,
        isLocked: false,
      },
      user.id,
    );
  }

  private async handleFailedLoginAttempt(user: User) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= this.MAX_FAILED_ATTEMPTS) {
      user.isLocked = true;
    }
    await this.userRepository.UpdateUser(
      {
        failedAttempts: user.failedAttempts,
        isLocked: user.isLocked,
      },
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
        fullname: `${data.lastName}, ${data.firstName}`,
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
        fullname: `${data.lastName}, ${data.firstName}`,
      });
      return res;
    },
    [ROLES.CLIENT]: async (data: User) => {
      throw new NotImplementedException('Rol client no implementado');
    },
  };

  private validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
