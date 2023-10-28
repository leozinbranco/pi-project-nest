/*
  Warnings:

  - You are about to drop the column `emailContatoTicket` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `nomeClienteTicket` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `observacaoTicket` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `telContatoTicket` on the `Tickets` table. All the data in the column will be lost.
  - You are about to alter the column `telefoneUsuario` on the `UsuariosAdm` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "emailContatoTicket",
DROP COLUMN "nomeClienteTicket",
DROP COLUMN "observacaoTicket",
DROP COLUMN "telContatoTicket";

-- AlterTable
ALTER TABLE "UsuariosAdm" ALTER COLUMN "telefoneUsuario" SET DATA TYPE VARCHAR(11);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "codOs" SERIAL NOT NULL,
    "numOs" VARCHAR(10) NOT NULL,
    "statusOs" VARCHAR(25) NOT NULL,
    "tipoOs" VARCHAR(20) NOT NULL,
    "descricaoAjustesOs" VARCHAR(200) NOT NULL,
    "observacaoOs" VARCHAR(200) NOT NULL,
    "telContatoOs" VARCHAR(11) NOT NULL,
    "emailContatoOs" VARCHAR(50) NOT NULL,
    "nomeClienteOs" VARCHAR(50) NOT NULL,
    "dataAberturaOs" TIMESTAMP(3) NOT NULL,
    "dataUltimaModOs" TIMESTAMP(3) NOT NULL,
    "atributoValidadorOs" VARCHAR(15) NOT NULL,
    "codEmpresaOs" INTEGER NOT NULL,

    CONSTRAINT "OrdemServico_pkey" PRIMARY KEY ("codOs")
);

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_codEmpresaOs_fkey" FOREIGN KEY ("codEmpresaOs") REFERENCES "EmpresaClientes"("codEmpresa") ON DELETE RESTRICT ON UPDATE CASCADE;
