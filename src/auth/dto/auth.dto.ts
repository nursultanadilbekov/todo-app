import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6, { message: 'Пароль минимум 6 символов' })
  @MaxLength(50, { message: 'Пароль максимум 50 символов' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}