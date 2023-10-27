/*
  Warnings:

  - You are about to drop the column `areaAtuaacaoEmpresa` on the `EmpresaClientes` table. All the data in the column will be lost.
  - Added the required column `areaAtuacaoEmpresa` to the `EmpresaClientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmpresaClientes" DROP COLUMN "areaAtuaacaoEmpresa",
ADD COLUMN     "areaAtuacaoEmpresa" VARCHAR(20) NOT NULL;
