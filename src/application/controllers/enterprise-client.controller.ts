import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonDto } from '../../services/dtos/enterpriseClient.dto';
import { PersonService } from '../../services/enterprise-client.service';

@Controller('persons')
export class PersonController {
  constructor(private personService: PersonService) {}
}
