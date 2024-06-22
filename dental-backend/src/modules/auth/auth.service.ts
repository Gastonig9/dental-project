import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UNION_ROLES } from 'src/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(payload: { id: number; role: UNION_ROLES }) {
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  public async comparePassword({
    hashPassword,
    plainPassword,
  }: {
    hashPassword: string;
    plainPassword: string;
  }): Promise<boolean> {
    return await compare(plainPassword, hashPassword);
  }

  public async hashPassword(password: string) {
    const plainToHash = await hash(password, 10);

    return plainToHash;
  }
}
