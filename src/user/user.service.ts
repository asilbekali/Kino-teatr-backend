import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async findUser(name: string) {
    const user = await this.prisma.user.findUnique({ where: { name } });
    return user;
  }

  async register(data: CreateUserDto, role: Role) {
    const existingUser = await this.findUser(data.name);
    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);


    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        age: data.age,
        password: hashedPassword,
        gmail: data.gmail,
        phone: data.phone,
        role: role
      },
    });

    return newUser;
  }

  async login(data: UpdateUserDto) {
    if (!data.name || !data.password) {
      throw new BadRequestException(
        'Name and password are required for login!',
      );
    }

    const user = await this.findUser(data.name);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password!');
    }

    const token = this.jwt.sign({
      id: user.id,
      role: user.role,
    });

    return { token };
  }
}
