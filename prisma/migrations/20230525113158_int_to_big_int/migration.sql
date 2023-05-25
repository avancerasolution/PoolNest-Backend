/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkOrderType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_Id` on the `WorkOrderType` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ShoppingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_id` to the `WorkOrderType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WorkOrderType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Client';

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingItem" DROP CONSTRAINT "ShoppingItem_work_order_type_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrderType" DROP CONSTRAINT "WorkOrderType_userId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "customer_id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "admin_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id");

-- AlterTable
ALTER TABLE "ShoppingItem" DROP CONSTRAINT "ShoppingItem_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "shopping_item_id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "work_order_type_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("shopping_item_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "admin_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkOrderType" DROP CONSTRAINT "WorkOrderType_pkey",
DROP COLUMN "admin_Id",
ADD COLUMN     "admin_id" BIGINT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "work_order_type_id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "WorkOrderType_pkey" PRIMARY KEY ("work_order_type_id");

-- CreateTable
CREATE TABLE "Dosage" (
    "dosage_id" SERIAL NOT NULL,
    "admin_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit_of_measurement" TEXT NOT NULL,
    "cost_per_unit" INTEGER NOT NULL,
    "include_service_price" BOOLEAN NOT NULL,
    "price_per_unit" INTEGER NOT NULL,
    "values" INTEGER[],

    CONSTRAINT "Dosage_pkey" PRIMARY KEY ("dosage_id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "reading_id" SERIAL NOT NULL,
    "admin_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit_of_measurement" TEXT NOT NULL,
    "values" INTEGER[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("reading_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderType" ADD CONSTRAINT "WorkOrderType_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_work_order_type_id_fkey" FOREIGN KEY ("work_order_type_id") REFERENCES "WorkOrderType"("work_order_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosage" ADD CONSTRAINT "Dosage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
