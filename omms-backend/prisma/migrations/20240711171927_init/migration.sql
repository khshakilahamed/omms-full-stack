-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('admin', 'general_user');

-- CreateEnum
CREATE TYPE "DAY_LIST" AS ENUM ('saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'general_user',
    "password" TEXT NOT NULL,
    "image" TEXT,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "meal_category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_meal_per_day" (
    "id" TEXT NOT NULL,
    "day_name" "DAY_LIST" NOT NULL,
    "riceId" TEXT NOT NULL,
    "proteinMealId" TEXT NOT NULL,
    "otherItemId1" TEXT,
    "otherItemId2" TEXT,
    "otherItemId3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_meal_per_day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "meal_categories_name_key" ON "meal_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "meal_items_name_meal_category_id_key" ON "meal_items"("name", "meal_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "available_meal_per_day_day_name_key" ON "available_meal_per_day"("day_name");

-- AddForeignKey
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_meal_category_id_fkey" FOREIGN KEY ("meal_category_id") REFERENCES "meal_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_riceId_fkey" FOREIGN KEY ("riceId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_proteinMealId_fkey" FOREIGN KEY ("proteinMealId") REFERENCES "meal_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId1_fkey" FOREIGN KEY ("otherItemId1") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId2_fkey" FOREIGN KEY ("otherItemId2") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_meal_per_day" ADD CONSTRAINT "available_meal_per_day_otherItemId3_fkey" FOREIGN KEY ("otherItemId3") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
