import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({
    name: 'role',
    enum: Role,
    description: 'Role of the user being registered',
  })
  @Post('/register')
  register(@Body() data: CreateUserDto, @Query('role') role: Role) {
    return this.userService.register(data, role);
  }

  @Post('/login')
  @ApiBody({
    description: 'Login credentials',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Alex' },
        password: { type: 'string', example: 'StronPassword_1' },
      },
    },
  })
  login(@Body() data: UpdateUserDto) {
    return this.userService.login(data);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  meUser() {
    return this.userService.userData();
  }
}
