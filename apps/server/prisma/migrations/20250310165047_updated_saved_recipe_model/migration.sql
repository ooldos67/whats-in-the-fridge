/*
  Warnings:

  - You are about to drop the column `description` on the `SavedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SavedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `SavedRecipe` table. All the data in the column will be lost.
  - The `ingredients` column on the `SavedRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dietaryRequirements` to the `SavedRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealType` to the `SavedRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `SavedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedRecipe" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "instructions",
ADD COLUMN     "dietaryRequirements" TEXT NOT NULL,
ADD COLUMN     "mealType" TEXT NOT NULL,
ADD COLUMN     "method" TEXT NOT NULL,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[];
