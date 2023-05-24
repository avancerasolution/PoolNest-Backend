/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSuperAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SuperAdmin', 'Admin', 'Technician');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "admin_id" INTEGER,
ADD COLUMN     "color_code" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "manage_admin_panel" BOOLEAN,
ADD COLUMN     "manage_general_settings" BOOLEAN,
ADD COLUMN     "manage_route_stops" BOOLEAN,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "rearrange_routes" BOOLEAN,
ADD COLUMN     "see_other_tech" BOOLEAN,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_type" "Role" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile_no_primary" TEXT NOT NULL,
    "mobile_no_secondary" TEXT,
    "company_name" TEXT,
    "company_address" TEXT,
    "billing_address" TEXT,
    "billing_details" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "WorkOrderType" (
    "work_order_type_id" SERIAL NOT NULL,
    "admin_Id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color_code" TEXT NOT NULL,
    "recurrence" TEXT NOT NULL,
    "labor_cost" DOUBLE PRECISION NOT NULL,
    "estimated_time_in_mins" INTEGER NOT NULL,
    "default_email_subject" TEXT NOT NULL,
    "default_email_message" TEXT NOT NULL,
    "check_list" TEXT[],
    "needs_invoiced" BOOLEAN NOT NULL,
    "alert_office" BOOLEAN NOT NULL,
    "photo_required" BOOLEAN NOT NULL,
    "email_to_customer" BOOLEAN NOT NULL,
    "allow_tech" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkOrderType_pkey" PRIMARY KEY ("work_order_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderType" ADD CONSTRAINT "WorkOrderType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
