-- CreateEnum
CREATE TYPE "DAY_LIST" AS ENUM ('saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday');

-- CreateTable
CREATE TABLE "available_meal_per_day" (
    "id" TEXT NOT NULL,
    "day_name" TEXT NOT NULL,
    "riceId" TEXT NOT NULL,
    "proteinMealId" TEXT NOT NULL,
    "otherItemId1" TEXT NOT NULL,
    "otherItemId2" TEXT NOT NULL,
    "otherItemId3" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_meal_per_day_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_riceId_fkey" FOREIGN KEY ("riceId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_proteinMealId_fkey" FOREIGN KEY ("proteinMealId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId1_fkey" FOREIGN KEY ("otherItemId1") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId2_fkey" FOREIGN KEY ("otherItemId2") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId3_fkey" FOREIGN KEY ("otherItemId3") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
