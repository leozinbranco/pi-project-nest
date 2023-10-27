import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SuportService {
    constructor(private readonly prismaService: PrismaService) {}

    create() {
        return this.prismaService.empresaClientes.create({
            data: {
                razaoSocialEmpresa: 'teste',
                nomeFantasiaEmpresa: 'teste2',
                cnpjEmpresa: 'matheusCalvo',
                emailEmpresa: 'tes4',
                areaAtuacaoEmpresa: 'teste5',
                telefoneEmpresa: 'tes3',
                enderecoEmpresa: 'tes2'
            }
        })
    }
}
