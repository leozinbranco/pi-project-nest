import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserAdm {
  @ApiProperty({
    example: '1234567899',
    required: true,
  })
  @MinLength(11)
  @IsString()
  cpf: string;

  @ApiProperty({
    example: '12345',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  password: string;
}

export class AdminLoginDto {
  @ApiProperty({
    example: '1234567899',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  password: string;
}
