import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
    //const payload = { sub: user.codUsuario, username: user.nomeUsuario };
    return user;
    /*return {
      access_token: await this.jwtService.signAsync(payload),
    };*/
  }
}
