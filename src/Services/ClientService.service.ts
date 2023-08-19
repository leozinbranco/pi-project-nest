import { Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/Interfaces/ClientInterface.interface';
import { BaseService } from './BaseService.service';

@Injectable()

export class ClientService extends BaseService {

    protected readonly table: string = 'Perons';

    createPerson (person: ClientInterface) {
        console.log(person);
    }

    updatedPerson (person: ClientInterface) {
        return this.update(person);
    }

}