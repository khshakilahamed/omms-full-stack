-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_otherItemId1_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_otherItemId2_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_otherItemId3_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_proteinMealId_fkey";

-- DropForeignKey
ALTER TABLE "available_meal_per_day" DROP CONSTRAINT "available_meal_per_day_riceId_fkey";

-- AlterTable
ALTER TABLE "available_meal_per_day" ALTER COLUMN "riceId" DROP NOT NULL,
ALTER COLUMN "proteinMealId" DROP NOT NULL,
ALTER COLUMN "otherItemId1" DROP NOT NULL,
ALTER COLUMN "otherItemId2" DROP NOT NULL,
ALTER COLUMN "otherItemId3" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_riceId_fkey" FOREIGN KEY ("riceId") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_proteinMealId_fkey" FOREIGN KEY ("proteinMealId") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId1_fkey" FOREIGN KEY ("otherItemId1") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId2_fkey" FOREIGN KEY ("otherItemId2") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId3_fkey" FOREIGN KEY ("otherItemId3") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
