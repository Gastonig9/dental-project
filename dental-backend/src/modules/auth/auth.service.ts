import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/login-register.dto';
import { UserRepository } from '../user/user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userRepository.GetUserByEmail(
      userLoginBody.email,
    );
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
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
