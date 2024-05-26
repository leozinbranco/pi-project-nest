import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../adapters/services/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAdm, AdminLoginDto } from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiBody({
    type: UserAdm,
    description: 'Json structure for user object',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({ status: 401, description: 'Usuário ou senha inválida' })
  async signIn(@Body() user: UserAdm) {
    return this.authService.signIn(user.cpf, user.password);
  }

  @Post('admin')
  @ApiBody({
    type: AdminLoginDto,
    description: 'Json structure for admin login',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário ou senha inválida ou usuário não é administrador',
  })
  async signInAdm(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.signInAdm(
      adminLoginDto.email,
      adminLoginDto.password,
    );
  }
}
