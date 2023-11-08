/*
  Warnings:

  - You are about to drop the column `nomeClienteOs` on the `OrdemServico` table. All the data in the column will be lost.
  - Added the required column `tipoObjOs` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdemServico" DROP COLUMN "nomeClienteOs",
ADD COLUMN     "cnpjClienteOs" VARCHAR(14),
ADD COLUMN     "tipoObjOs" VARCHAR(25) NOT NULL,
ALTER COLUMN "descricaoAjustesOs" DROP NOT NULL,
ALTER COLUMN "observacaoOs" DROP NOT NULL,
ALTER COLUMN "telContatoOs" DROP NOT NULL,
ALTER COLUMN "emailContatoOs" DROP NOT NULL,
ALTER COLUMN "atributoValidadorOs" DROP NOT NULL;
