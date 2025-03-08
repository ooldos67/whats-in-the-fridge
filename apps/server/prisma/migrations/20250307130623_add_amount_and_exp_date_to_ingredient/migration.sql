/*
  Warnings:

  - Added the required column `amount` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expDate` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "expDate" TIMESTAMP(3) NOT NULL;
