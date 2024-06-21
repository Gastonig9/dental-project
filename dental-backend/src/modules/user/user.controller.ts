import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { UserRequestDto } from 'src/dtos';
import { DentistDto } from 'src/dtos';

@Public()
@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const hello = '';
    return await this.service.getUser(parseInt(id));
  }

  @Post('/register-user')
  @ApiBody({ type: UserRequestDto })
  async addUser(@Body() data: User): Promise<User> {
    return await this.service.addUser(data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.service.deleteUser(parseInt(id));
  }
}
