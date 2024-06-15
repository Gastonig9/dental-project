import { Controller, Get } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { SecretaryResponseDto } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Secretary')
@Controller('/secretary')
export class SecretaryController {
  constructor(private readonly service: SecretaryService) {}

  @Get()
  async getAllUsers(): Promise<SecretaryResponseDto[]> {
    return await this.service.getAllSecretaries();
  }
}
