/*
  Warnings:

  - Made the column `riceId` on table `available_meal_per_day` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proteinMealId` on table `available_meal_per_day` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otherItemId1` on table `available_meal_per_day` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_otherItemId1_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_proteinMealId_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_riceId_fkey";

-- AlterTable
ALTER TABLE "available_meal_per_day" ALTER COLUMN "riceId" SET NOT NULL,
ALTER COLUMN "proteinMealId" SET NOT NULL,
ALTER COLUMN "otherItemId1" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_riceId_fkey" FOREIGN KEY ("riceId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_proteinMealId_fkey" FOREIGN KEY ("proteinMealId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId1_fkey" FOREIGN KEY ("otherItemId1") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
