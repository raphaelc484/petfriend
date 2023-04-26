/*
  Warnings:

  - You are about to drop the column `adopotion_requirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `environment` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adopotion_requirements",
DROP COLUMN "energy",
DROP COLUMN "environment",
DROP COLUMN "photos";

-- DropEnum
DROP TYPE "EnergyType";

-- DropEnum
DROP TYPE "EnvironmentType";
