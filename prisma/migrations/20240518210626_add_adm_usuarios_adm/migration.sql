/*
  Warnings:

  - Added the required column `adm` to the `UsuariosAdm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsuariosAdm" ADD COLUMN     "adm" BOOLEAN NOT NULL;
