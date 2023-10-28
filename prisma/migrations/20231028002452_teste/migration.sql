/*
  Warnings:

  - You are about to drop the column `telefoneUsuario` on the `UsuariosAdm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsuariosAdm" DROP COLUMN "telefoneUsuario",
ADD COLUMN     "telefoneUsario" TEXT;
