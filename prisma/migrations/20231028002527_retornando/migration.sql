/*
  Warnings:

  - You are about to drop the column `telefoneUsario` on the `UsuariosAdm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsuariosAdm" DROP COLUMN "telefoneUsario",
ADD COLUMN     "telefoneUsuario" TEXT;
