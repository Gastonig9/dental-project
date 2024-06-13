import { Controller, Get } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { SecretaryResponseDto } from 'src/dtos';

@Controller('/secretary')
export class SecretaryController {
  constructor(private readonly service: SecretaryService) {}

  @Get()
  async getAllUsers(): Promise<SecretaryResponseDto[]> {
    return await this.service.getAllSecretaries();
  }
}
