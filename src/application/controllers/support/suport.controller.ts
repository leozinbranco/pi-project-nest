import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { SuportService } from '../../../adapters/services/suport.service';
import { Tickets } from '@prisma/client';
import { Response } from 'express';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Controller('support')
export class SuportController {
  constructor(private readonly suportService: SuportService) {}

  // @Get()
  // async findAll() {
  //   return await this.suportService.findAll();
  // }

  @Get(':numTicket')
  async find(@Param() params: { numTicket: number }, @Res() res: Response) {
    const ticket = await this.suportService.find(params.numTicket);

      if (!ticket) {
        return res.status(HttpStatus.NOT_FOUND).json({
          data: [],
          message: 'Nenhum ticket foi encontrado',
          status: false,
        });
      }

      return res.status(200).json({
        data: [ticket],
        message: 'Ticket encontrado com sucesso',
        status: true,
      });
    } else {
      const tickets = await this.suportService.findAll();
      return res.status(200).json({
        data: tickets,
        message: 'Tickets encontrados com sucesso',
        status: true,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() suportDTO: Tickets, @Res() res: Response) {
    const ticket = await this.suportService.create(suportDTO);
    const enterprise = await this.suportService.findEnterprise(
      ticket.codEmpresaTicket,
    );
    return res.status(HttpStatus.CREATED).json({
      data: [
        {
          numTicket: ticket.numTicket,
        },
      ],
      message: `Ticket Criado com sucesso para a empresa ${enterprise.nomeFantasiaEmpresa}`,
      status: true,
    });
  }

  // @UseGuards(AuthGuard)
  @Patch(':numTicket')
  async update(
    @Param('numTicket') numTicket: string,
    @Body() updateData: Partial<Tickets>,
    @Res() res: Response,
  ) {
    const ticketNumInt = Number(numTicket);
    const updatedTicket = await this.suportService.update(
      ticketNumInt,
      updateData,
    );

    if (!updatedTicket) {
      return res.status(HttpStatus.NOT_FOUND).json({
        data: [],
        message: 'Nenhum ticket foi encontrado',
        status: false,
      });
    }

    return res.status(HttpStatus.OK).json({
      data: [updatedTicket],
      message: 'Ticket atualizado com sucesso',
      status: true,
    });
  }
}
