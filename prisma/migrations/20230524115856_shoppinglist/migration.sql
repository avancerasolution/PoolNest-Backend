-- CreateTable
CREATE TABLE "ShoppingItem" (
    "shopping_item_id" SERIAL NOT NULL,
    "work_order_type_id" INTEGER,
    "description" TEXT NOT NULL,
    "purchased" BOOLEAN NOT NULL,
    "item_type" TEXT NOT NULL,
    "assigned_to" TEXT NOT NULL,
    "product_images" TEXT[],

    CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("shopping_item_id")
);

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_work_order_type_id_fkey" FOREIGN KEY ("work_order_type_id") REFERENCES "WorkOrderType"("work_order_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
