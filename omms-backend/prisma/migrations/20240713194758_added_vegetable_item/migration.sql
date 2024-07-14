-- AlterTable
ALTER TABLE "available_meal_per_day" ADD COLUMN     "vegetableMealId" TEXT;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_vegetableMealId_fkey" FOREIGN KEY ("vegetableMealId") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
