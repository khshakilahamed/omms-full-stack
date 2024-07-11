/*
  Warnings:

  - A unique constraint covering the columns `[day_name,date]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_day_name_date_key" ON "orders"("day_name", "date");
