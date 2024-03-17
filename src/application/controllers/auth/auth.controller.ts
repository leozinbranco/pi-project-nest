import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../../adapters/services/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAdm } from './auth.types';
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
}
