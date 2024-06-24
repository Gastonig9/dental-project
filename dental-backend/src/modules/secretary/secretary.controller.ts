import { Controller, Get, UseGuards } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { SecretaryResponseDto } from 'src/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Secretary')
@UseGuards(RolesGuard)
@Roles('SECRETARY', 'OWNER')
@Controller('/secretary')
export class SecretaryController {
  constructor(private readonly service: SecretaryService) {}

  @Get()
  async getAllUsers(): Promise<SecretaryResponseDto[]> {
    return await this.service.getAllSecretaries();
  }

  @Get('/probarDecorator')
  async getJson(): Promise<string> {
    return 'para testear que el guarda de roles se puede agregar al controller directamente';
  }
}
