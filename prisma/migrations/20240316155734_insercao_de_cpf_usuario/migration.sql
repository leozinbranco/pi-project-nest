/*
  Warnings:

  - You are about to alter the column `atributoValidadorOs` on the `OrdemServico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(1)`.
  - Added the required column `cpfUsuario` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdemServico" ADD COLUMN     "cpfUsuario" VARCHAR(11) NOT NULL,
ALTER COLUMN "atributoValidadorOs" SET DATA TYPE VARCHAR(1);
