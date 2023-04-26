-- CreateEnum
CREATE TYPE "AgeType" AS ENUM ('PUPPY', 'ADULT', 'WISE');

-- CreateEnum
CREATE TYPE "SizeType" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "EnergyType" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "EnvironmentType" AS ENUM ('LARGE', 'SMALL');

-- CreateTable
CREATE TABLE "meals" (
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

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
