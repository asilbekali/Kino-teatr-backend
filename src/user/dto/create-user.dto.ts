import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Alex',
  })
  name: string;

  @ApiProperty({
    description: 'User age',
    example: 18,
  })
  age: number;

  @ApiProperty({
    description: 'User password',
    example: 'StronPassword_1',
  })
  password: string;

  @ApiProperty({
    description: 'User gmail',
    example: 'Alex@gmail.com',
  })
  gmail: string;

  @ApiProperty({
    description: 'User phone',
    example: '+998903699632',
  })
  phone: string;

  role: Role;
}
