import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Public } from 'src/decorators/public.decorator';
// import { UserRequestDto } from '../../dtos';
// import { ResponseAuthDto } from '../auth/dto/response-auth.dto';

@Public()
@ApiBearerAuth()
@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.service.deleteUser(parseInt(id));
  }
}
