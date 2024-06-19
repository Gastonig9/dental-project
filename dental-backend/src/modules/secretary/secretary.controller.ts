import { Controller, Get, UseGuards } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { SecretaryResponseDto } from 'src/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiBearerAuth()
@ApiTags('Secretary')
@Controller('/secretary')
export class SecretaryController {
  constructor(private readonly service: SecretaryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SECRETARY')
  @Get()
  async getAllUsers(): Promise<SecretaryResponseDto[]> {
    return await this.service.getAllSecretaries();
  }
}
