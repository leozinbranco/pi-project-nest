import { Injectable } from '@nestjs/common';
import { PersonInterface } from '../Interfaces/person.interface';
import { BaseService } from '../../base.service';

@Injectable()

export class PersonService extends BaseService {

    protected readonly table: string = 'Perons';

    createPerson (person: PersonInterface) {
        console.log(person);
    }

    updatedPerson (person: PersonInterface) {
        return this.update(person);
    }

}