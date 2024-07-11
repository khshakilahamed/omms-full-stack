/*
  Warnings:

  - You are about to drop the column `chosenMealItem1` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `chosenMealItem2` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `chosenMealItem3` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_chosenMealItem1_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_chosenMealItem2_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_chosenMealItem3_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "chosenMealItem1",
DROP COLUMN "chosenMealItem2",
DROP COLUMN "chosenMealItem3",
ADD COLUMN     "chosenMealId1" TEXT,
ADD COLUMN     "chosenMealId2" TEXT,
ADD COLUMN     "chosenMealId3" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealId1_fkey" FOREIGN KEY ("chosenMealId1") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealId2_fkey" FOREIGN KEY ("chosenMealId2") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealId3_fkey" FOREIGN KEY ("chosenMealId3") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
