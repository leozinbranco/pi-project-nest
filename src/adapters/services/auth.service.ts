import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(cpf, pass) {
    const user = await this.usersService.findOne(cpf);
    if (!user) {
      throw new NotFoundException();
    }
    if (user?.senhaUsuario !== String(pass)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.codUsuario, username: user.nomeUsuario };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInAdm(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email); 
    if (user && user.senhaUsuario === password) {
      const payload = {
        email: user.emailUsuario,
        sub: user.codUsuario,
        adm: true,
      };
      return {
        user: user,
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException(
      'Usuário ou senha inválida ou usuário não é administrador',
    );
  }
}
