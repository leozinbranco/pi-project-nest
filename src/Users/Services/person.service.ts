import { Injectable,  } from '@nestjs/common';
import { PersonDto } from '../DTO/person.dto';
import { BaseService } from '../../base.service';
import { Repository } from 'typeorm';
import { Person } from '../Entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class PersonService extends BaseService {

    constructor(
        @InjectRepository(Person)
        protected readonly personRepository: Repository<Person>
    )
    {
        super();
        super.repository = personRepository;
    }

    createPerson(person: PersonDto) {
        return this.create(person);
    }

    searchPerson(personId: number) {
        return this.search(personId);
    }

}