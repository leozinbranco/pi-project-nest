import { Injectable } from '@nestjs/common';
import { PersonDto } from './dtos/enterpriseClient.dto';
import { BaseService } from './base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService extends BaseService {}
