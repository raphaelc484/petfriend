/*
  Warnings:

  - You are about to drop the `meals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_user_id_fkey";

-- DropTable
DROP TABLE "meals";

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "AgeType" NOT NULL,
    "size" "SizeType" NOT NULL,
    "energy" "EnergyType" NOT NULL,
    "self_support" TEXT NOT NULL,
    "environment" "EnvironmentType" NOT NULL,
    "photos" TEXT NOT NULL,
    "adopotion_requirements" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
