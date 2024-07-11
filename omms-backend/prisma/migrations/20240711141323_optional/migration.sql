-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_otherItemId1_fkey";

-- AlterTable
ALTER TABLE "available_meal_per_day" ALTER COLUMN "otherItemId1" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId1_fkey" FOREIGN KEY ("otherItemId1") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
