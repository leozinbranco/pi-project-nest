import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'teste',
      password: 'teste123',
    },
    {
      userId: 2,
      username: 'outroUsuario',
      password: 'outraSenha',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
