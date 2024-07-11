/*
  Warnings:

  - A unique constraint covering the columns `[day_name]` on the table `available_meal_per_day` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `day_name` on the `available_meal_per_day` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "available_meal_per_day" DROP COLUMN "day_name",
ADD COLUMN     "day_name" "DAY_LIST" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "available_meal_per_day_day_name_key" ON "available_meal_per_day"("day_name");
