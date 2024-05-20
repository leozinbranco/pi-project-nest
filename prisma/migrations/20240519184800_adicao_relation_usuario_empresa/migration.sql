/*
  Warnings:

  - You are about to drop the column `codEmpresaUsuario` on the `UsuariosAdm` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsuariosAdm" DROP CONSTRAINT "UsuariosAdm_codEmpresaUsuario_fkey";

-- AlterTable
ALTER TABLE "UsuariosAdm" DROP COLUMN "codEmpresaUsuario",
ADD COLUMN     "empresaClientesCodEmpresa" INTEGER,
ADD COLUMN     "empresaClientesDocumentUsuario" VARCHAR(14);

-- AddForeignKey
ALTER TABLE "UsuariosAdm" ADD CONSTRAINT "UsuariosAdm_empresaClientesDocumentUsuario_fkey" FOREIGN KEY ("empresaClientesDocumentUsuario") REFERENCES "EmpresaClientes"("cnpjEmpresa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuariosAdm" ADD CONSTRAINT "UsuariosAdm_empresaClientesCodEmpresa_fkey" FOREIGN KEY ("empresaClientesCodEmpresa") REFERENCES "EmpresaClientes"("codEmpresa") ON DELETE SET NULL ON UPDATE CASCADE;
