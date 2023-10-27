-- CreateTable
CREATE TABLE "EmpresaClientes" (
    "codEmpresa" SERIAL NOT NULL,
    "razaoSocialEmpresa" VARCHAR(25) NOT NULL,
    "nomeFantasiaEmpresa" VARCHAR(35) NOT NULL,
    "cnpjEmpresa" VARCHAR(14) NOT NULL,
    "emailEmpresa" VARCHAR(50) NOT NULL,
    "areaAtuaacaoEmpresa" VARCHAR(20) NOT NULL,
    "telefoneEmpresa" VARCHAR(15) NOT NULL,
    "enderecoEmpresa" VARCHAR(75) NOT NULL,

    CONSTRAINT "EmpresaClientes_pkey" PRIMARY KEY ("codEmpresa")
);

-- CreateTable
CREATE TABLE "UsuariosAdm" (
    "codUsuario" SERIAL NOT NULL,
    "nomeUsuario" VARCHAR(20) NOT NULL,
    "cpfUsuario" VARCHAR(11) NOT NULL,
    "telefoneUsuario" TEXT,
    "emailUsuario" VARCHAR(50) NOT NULL,
    "senhaUsuario" VARCHAR(8) NOT NULL,
    "codEmpresaUsuario" INTEGER NOT NULL,

    CONSTRAINT "UsuariosAdm_pkey" PRIMARY KEY ("codUsuario")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "numTicket" SERIAL NOT NULL,
    "nomeClienteTicket" VARCHAR(50),
    "statusTicket" VARCHAR(25) NOT NULL,
    "tipoTicket" VARCHAR(20) NOT NULL,
    "descricaoTicket" VARCHAR(200) NOT NULL,
    "dataAberturaTicket" TIMESTAMP(3) NOT NULL,
    "dataUltimaModTicket" TIMESTAMP(3) NOT NULL,
    "descricaoAjusteTicket" VARCHAR(200) NOT NULL,
    "observacaoTicket" VARCHAR(200) NOT NULL,
    "emailContatoTicket" VARCHAR(50) NOT NULL,
    "telContatoTicket" VARCHAR NOT NULL,
    "cnpjEmpresaTicket" VARCHAR(15) NOT NULL,
    "codEmpresaTicket" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("numTicket")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpresaClientes_cnpjEmpresa_key" ON "EmpresaClientes"("cnpjEmpresa");

-- AddForeignKey
ALTER TABLE "UsuariosAdm" ADD CONSTRAINT "UsuariosAdm_codEmpresaUsuario_fkey" FOREIGN KEY ("codEmpresaUsuario") REFERENCES "EmpresaClientes"("codEmpresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_codEmpresaTicket_fkey" FOREIGN KEY ("codEmpresaTicket") REFERENCES "EmpresaClientes"("codEmpresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_cnpjEmpresaTicket_fkey" FOREIGN KEY ("cnpjEmpresaTicket") REFERENCES "EmpresaClientes"("cnpjEmpresa") ON DELETE RESTRICT ON UPDATE CASCADE;
