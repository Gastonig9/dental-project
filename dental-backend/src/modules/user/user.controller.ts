import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
// import { UserRequestDto } from '../../dtos';
// import { ResponseAuthDto } from '../auth/dto/response-auth.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles('OWNER')
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.service.getUser(parseInt(id));
  }

  // @Post()
  // @ApiBody({ type: UserRequestDto })
  // async addUser(@Body() data: User): Promise<ResponseAuthDto> {
  //   return await this.service.addUser(data);
  // }

  @Delete(':id')
  @UseGuards(RolesGuard, JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.service.deleteUser(parseInt(id));
  }
}
