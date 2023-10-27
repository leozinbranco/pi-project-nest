import { Controller, Get } from '@nestjs/common';
import { SuportService } from './suport.service';

@Controller('suport')
export class SuportController {
    constructor(private readonly suportService: SuportService) {}

    @Get()
    create() {
        return this.suportService.create();
    }
}
