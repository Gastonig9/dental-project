import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserRepository } from '../user/user.repository';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async login(userLoginBody: LoginAuthDto) {
    const { password: passwordLoginPlain } = userLoginBody;

    const userExist = await this.userRepository.GetUserByEmail(
      userLoginBody.email,
    );

    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const { id, password, ...userWithoutId } = userExist;
    const { role_name } = userWithoutId;

    const isEqual = await compare(passwordLoginPlain, password);

    if (!isEqual)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const payload = {
      id: id,
      role: role_name,
    };
    const token = await this.jwtService.signAsync(payload);

    const response = {
      userWithoutId,
      token,
    };

    return response;
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const plainToHash = await hash(password, 10);

    const userParse = {
      ...user,
      password: plainToHash,
    };

    const newUser = await this.userRepository.AddUser(userParse);

    return newUser;
  }
}
