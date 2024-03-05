import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// ajustar cada função com await pela chamada do banco de dados realizar uma requisição assíncrona
// ajustar cada função com try catch

@Injectable()
export class BaseService {
  protected repository: Repository<any>;

  /* Realiza a criação de uma informação dentro do banco de dados */
  create(param: object) {
    return this.repository.save(param);
  }

  update(param: object) {
    // regra de negócio
  }

  delete(param: number) {
    // regra de negócio
  }

  search(id: number) {
    return this.repository.findBy({ id: id });
  }

  searchAll() {
    console.log('deu certo');
  }
}
