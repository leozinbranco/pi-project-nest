import { Controller, Get, Param, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SuportService } from './suport.service';
import { MailerMailService } from 'src/mailer-mail/mailer-mail.service';
import { Tickets } from '@prisma/client';
import { Response } from 'express';

@Controller('suport')
export class SuportController {
    constructor(
        private readonly suportService: SuportService, 
        private readonly mailService: MailerMailService) {}

    @Get()
    async findAll() {
        return await this.suportService.findAll();
    }

    @Get(':numTicket')
    async find(@Param() params: { numTicket: number}, @Res() res: Response) {
        console.log(params.numTicket)

        let ticket = await this.suportService.find(params.numTicket);

        if (ticket === null) {
            return res.status(HttpStatus.NOT_FOUND).json({
                data: [], 
                message: 'Nenhum ticket foi encontrado',
                status: false
            })
        }

        return res.status(200).json({
            data: [ticket],
            message: 'Ticket encontrado com sucesso',
            status: true
        })
    }

    @Post()
    async create(@Body() suportDTO: Tickets, @Res() res: Response) {
        let ticket = await this.suportService.create(suportDTO);
        let enterprise = await this.suportService.findEnterprise(ticket.codEmpresaTicket)
        if (ticket) {
            await this.mailService.sendEmailTicket('viniciusdereck39@gmail.com', 'spfc tomou 5', 'index', Number(enterprise.EmpresaTicket[0].numTicket))
        }
        return res.status(HttpStatus.CREATED).json({
            data: [ { 
                numTicket: ticket.numTicket
            } ],
            message: `Ticket Criado com sucesso para a empresa ${enterprise.nomeFantasiaEmpresa}`,
            status: true
        })
    }
}
