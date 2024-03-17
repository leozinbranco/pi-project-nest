import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserAdm {
  @ApiProperty({
    example: '1234567899',
    required: true,
  })
  @MinLength(11)
  @IsString()
  cpfCnpj: string;

  @ApiProperty({
    example: '12345',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  password: string;
}
