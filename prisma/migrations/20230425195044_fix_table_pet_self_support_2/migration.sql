/*
  Warnings:

  - Changed the type of `self_support` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SelfSupportType" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "self_support",
ADD COLUMN     "self_support" "SelfSupportType" NOT NULL;

-- DropEnum
DROP TYPE "SelfSupport";
