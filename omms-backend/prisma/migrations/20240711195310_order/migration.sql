-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "day_name" "DAY_LIST" NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "chosenMealItem1" TEXT,
    "chosenMealItem2" TEXT,
    "chosenMealItem3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_day_name_key" ON "orders"("day_name");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealItem1_fkey" FOREIGN KEY ("chosenMealItem1") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealItem2_fkey" FOREIGN KEY ("chosenMealItem2") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_chosenMealItem3_fkey" FOREIGN KEY ("chosenMealItem3") REFERENCES "meal_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
