import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService {

    protected readonly table: string;


    /* Realiza a criação de uma informação dentro do banco de dados */
    create (param: object, ) {
        console.log('deu certo');
    }

    update (param: object, ) {
        // regra de negócio
    }

    delete (param: number, ) {
        // regra de negócio
    }

    search (param: number, ) {
        // regra de negócio
    }

    searchAll () {
        console.log('deu certo');
    }
}