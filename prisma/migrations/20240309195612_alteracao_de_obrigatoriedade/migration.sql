/*
  Warnings:

  - Made the column `cnpjClienteOs` on table `OrdemServico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrdemServico" ALTER COLUMN "dataUltimaModOs" DROP NOT NULL,
ALTER COLUMN "cnpjClienteOs" SET NOT NULL;
