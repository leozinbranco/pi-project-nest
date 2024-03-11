import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PersonDto } from '../../adapters/services/dtos/enterpriseClient.dto';
import { PersonService } from '../../adapters/services/enterprise-client.service';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('persons')
// @UseGuards(AuthGuard)
export class PersonController {
  constructor(private personService: PersonService) {}
}
