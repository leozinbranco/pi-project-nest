import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonDto } from './DTO/enterpriseClient.dto';
import { PersonService } from './enterprise-client.service';

@Controller('persons')
export class PersonController {
  constructor(private personService: PersonService) {}
}
