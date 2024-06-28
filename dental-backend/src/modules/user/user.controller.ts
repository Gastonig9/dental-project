import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { UserAuthResponseDto, UserLoginDto, UserRegisterDto } from 'src/dtos';
import { RequestResetPasswordDto, ResetPasswordDto } from 'src/dtos/user';
import { Response } from 'express';

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
    return await this.service.getUser(parseInt(id));
  }

  @Post('/register-user')
  @ApiBody({ type: UserRegisterDto })
  async RegisterUser(@Body() data: User): Promise<User> {
    return await this.service.register(data);
  }

  @Post('/login-user')
  @ApiBody({ type: UserLoginDto })
  async loginUser(@Body() data: User): Promise<UserAuthResponseDto> {
    return await this.service.login(data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.service.deleteUser(parseInt(id));
  }

  @Patch('/request-reset-password')
  async requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
    @Res() res: Response,
  ) {
    await this.service.requestResetPassword(requestResetPasswordDto);

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
    });
  }

  @Patch('/reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    await this.service.resetPassword(resetPasswordDto);

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
    });
  }
}
