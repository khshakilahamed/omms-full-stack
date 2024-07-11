/*
  Warnings:

  - A unique constraint covering the columns `[name,meal_category_id]` on the table `meal_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "meal_items_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "meal_items_name_meal_category_id_key" ON "meal_items"("name", "meal_category_id");
