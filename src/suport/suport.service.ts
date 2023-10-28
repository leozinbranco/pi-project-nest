import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuportDTO } from './DTO/Suport.dto';
import { Tickets } from '@prisma/client';

@Injectable()
export class SuportService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(suportData: Tickets): Promise<Tickets> {
        return await this.prismaService.tickets.create({
            data: suportData
        });
    }

    async findAll() {
        return await this.prismaService.tickets.findMany();
    }

    async find(numTicket: number ) {
        return await this.prismaService.tickets.findFirst({ where: { numTicket: Number(numTicket) }})
    }
}
