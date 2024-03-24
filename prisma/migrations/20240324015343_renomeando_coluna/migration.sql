/*
  Warnings:

  - You are about to drop the column `cpfUsuario` on the `OrdemServico` table. All the data in the column will be lost.
  - Added the required column `documento` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdemServico" DROP COLUMN "cpfUsuario",
ADD COLUMN     "documento" VARCHAR(14) NOT NULL;
