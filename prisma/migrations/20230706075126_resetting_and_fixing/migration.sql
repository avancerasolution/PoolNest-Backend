-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Client', 'SuperAdmin', 'Admin', 'Technician');

-- CreateEnum
CREATE TYPE "frequencyForService" AS ENUM ('WEEKLY', 'EVERY_TWO_WEEKS', 'EVERY_THREE_WEEKS', 'EVERY_FOUR_WEEKS');

-- CreateEnum
CREATE TYPE "laborCostType" AS ENUM ('PER_STOP', 'PER_MONTH', 'NONE');

-- CreateEnum
CREATE TYPE "rateType" AS ENUM ('NONE', 'PER_STOP_WITH_CHEMICAL', 'PER_STOP_PLUS_CHEMICAL', 'PER_MONTH_WITH_CHEMICAL', 'PER_MONTH_PLUS_CHEMICAL');

-- CreateEnum
CREATE TYPE "days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "serviceMailDetailType" AS ENUM ('completion', 'skip');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_type" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "color_code" TEXT,
    "see_other_tech" BOOLEAN,
    "manage_admin_panel" BOOLEAN,
    "manage_general_settings" BOOLEAN,
    "manage_route_stops" BOOLEAN,
    "rearrange_routes" BOOLEAN,
    "admin_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "admin_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "customer_type" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT,
    "mobile_no_primary" TEXT NOT NULL,
    "mobile_no_secondary" TEXT,
    "company_name" TEXT,
    "company_address" TEXT,
    "billing_address" TEXT,
    "billing_details" TEXT,
    "do_not_disturb" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "ServiceLocation" (
    "service_location_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location_code" TEXT NOT NULL,
    "gate_code" TEXT,
    "dog_name" TEXT,
    "minutes_per_stop" INTEGER NOT NULL,
    "sales_tax_group" TEXT,
    "rate" INTEGER NOT NULL,
    "labor_cost" INTEGER NOT NULL,
    "labor_cost_type" "laborCostType" NOT NULL,
    "notes" TEXT NOT NULL,
    "notify_sms" BOOLEAN NOT NULL,
    "notify_email" BOOLEAN NOT NULL,
    "notify_work_completion_sms" BOOLEAN NOT NULL,
    "notify_work_completion_email" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceLocation_pkey" PRIMARY KEY ("service_location_id")
);

-- CreateTable
CREATE TABLE "Waterbody" (
    "waterbody_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "service_location_id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "waterbody_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assigned_day" "days" NOT NULL,
    "frequency" "frequencyForService" NOT NULL,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waterbody_pkey" PRIMARY KEY ("waterbody_id")
);

-- CreateTable
CREATE TABLE "WorkOrderType" (
    "work_order_type_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
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
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrderType_pkey" PRIMARY KEY ("work_order_type_id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "work_order_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "service_location_id" TEXT NOT NULL,
    "work_order_type_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "work_needed" TEXT,
    "work_performed" TEXT,
    "notes" TEXT,
    "service_date" TIMESTAMP(3) NOT NULL,
    "estimated_time_minutes" INTEGER NOT NULL,
    "labor_cost" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "labor_cost_paid" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TEXT,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("work_order_id")
);

-- CreateTable
CREATE TABLE "ShoppingItem" (
    "shopping_item_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "purchased" BOOLEAN NOT NULL,
    "item_type" TEXT NOT NULL,
    "assigned_to" TEXT NOT NULL,
    "product_images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("shopping_item_id")
);

-- CreateTable
CREATE TABLE "Dosage" (
    "dosage_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit_of_measurement" TEXT NOT NULL,
    "cost_per_unit" INTEGER NOT NULL,
    "include_service_price" BOOLEAN NOT NULL,
    "price_per_unit" INTEGER NOT NULL,
    "values" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active_service_id" TEXT NOT NULL,

    CONSTRAINT "Dosage_pkey" PRIMARY KEY ("dosage_id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "reading_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit_of_measurement" TEXT NOT NULL,
    "values" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active_service_id" TEXT NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("reading_id")
);

-- CreateTable
CREATE TABLE "ServiceChecklist" (
    "service_checklist_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "active_service_id" TEXT,
    "admin_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "description_on_complete" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceServie_id" TEXT NOT NULL,

    CONSTRAINT "ServiceChecklist_pkey" PRIMARY KEY ("service_checklist_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "service_location_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "assigned_day" "days" NOT NULL,
    "status" TEXT NOT NULL,
    "frequency" "frequencyForService" NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "labor_cost" INTEGER NOT NULL DEFAULT 0,
    "labor_cost_type" "laborCostType" NOT NULL DEFAULT 'NONE',
    "minutes_per_stop" INTEGER NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3) NOT NULL,
    "stop_date" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "equipment_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("equipment_id")
);

-- CreateTable
CREATE TABLE "ItemNeeded" (
    "item_needed_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemNeeded_pkey" PRIMARY KEY ("item_needed_id")
);

-- CreateTable
CREATE TABLE "ActiveService" (
    "active_service_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "service_status" TEXT NOT NULL DEFAULT 'incomplete',
    "status" TEXT,
    "technician_id" TEXT NOT NULL,
    "service_location_id" TEXT NOT NULL,
    "frequency" "frequencyForService" NOT NULL,
    "customer_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "stop_date" TEXT NOT NULL,
    "assigned_day" "days" NOT NULL,
    "assigned_date" TIMESTAMP(3) NOT NULL,
    "rate" INTEGER,
    "labor_cost" INTEGER NOT NULL,
    "labor_cost_type" "laborCostType" NOT NULL,
    "minutes_per_stop" INTEGER NOT NULL,
    "price" INTEGER,
    "total" INTEGER,
    "payment_method" TEXT,
    "payment_status" TEXT,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveService_pkey" PRIMARY KEY ("active_service_id")
);

-- CreateTable
CREATE TABLE "ActiveWorkOrder" (
    "active_work_order_id" TEXT NOT NULL,
    "work_order_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "waterbody_id" TEXT NOT NULL,
    "service_location_id" TEXT NOT NULL,
    "work_order_type_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "service_date" TIMESTAMP(3) NOT NULL,
    "estimated_time_minutes" INTEGER NOT NULL,
    "labor_cost" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "labor_cost_paid" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveWorkOrder_pkey" PRIMARY KEY ("active_work_order_id")
);

-- CreateTable
CREATE TABLE "emailDetail" (
    "email_detail_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "from_name" TEXT,
    "from_email" TEXT,
    "company_name" TEXT,
    "bcc_list" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "company_address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" TEXT,
    "email" TEXT,
    "mobile_no" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "send_email_to_customer" BOOLEAN,
    "alternative_email" TEXT,

    CONSTRAINT "emailDetail_pkey" PRIMARY KEY ("email_detail_id")
);

-- CreateTable
CREATE TABLE "ServiceMailDetail" (
    "service_mail_detail_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Pool Service Report for {DATE}',
    "header" TEXT NOT NULL DEFAULT 'Your Pool Is Now Sparkling Clean',
    "message" TEXT NOT NULL DEFAULT 'Thanks for choosing us to keep your pool looking great! Attached is a readout of what is going on with your {SERVICE LOCATION NAME} {POOL NAME} for the week. If you have any questions we''re always here to answer!',
    "footer" TEXT NOT NULL DEFAULT 'Have a great day!',
    "include_reading" BOOLEAN NOT NULL DEFAULT false,
    "include_dosage" BOOLEAN NOT NULL DEFAULT false,
    "include_checklist" BOOLEAN NOT NULL DEFAULT false,
    "include_tech" BOOLEAN NOT NULL DEFAULT false,
    "include_media" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceMailDetail_pkey" PRIMARY KEY ("service_mail_detail_id")
);

-- CreateTable
CREATE TABLE "ServiceSkippedMailDetail" (
    "service_skipped_mail_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "include_tech_reason" BOOLEAN NOT NULL DEFAULT false,
    "include_reason_in_mail" BOOLEAN NOT NULL DEFAULT false,
    "email_office" BOOLEAN NOT NULL DEFAULT false,
    "email_customer" BOOLEAN NOT NULL DEFAULT false,
    "subject" TEXT NOT NULL DEFAULT 'Your service on {DATE} could not be completed',
    "header" TEXT NOT NULL DEFAULT 'We were unable to service your pool',
    "message" TEXT NOT NULL DEFAULT 'Hi {CUSTOMER} 

 We''re sorry that we were unable to service your pool today,Please contact us for more information',
    "footer" TEXT NOT NULL DEFAULT 'Have a great day',

    CONSTRAINT "ServiceSkippedMailDetail_pkey" PRIMARY KEY ("service_skipped_mail_id")
);

-- CreateTable
CREATE TABLE "_CustomerTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "emailDetail_admin_id_key" ON "emailDetail"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMailDetail_admin_id_key" ON "ServiceMailDetail"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceSkippedMailDetail_admin_id_key" ON "ServiceSkippedMailDetail"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerTag_AB_unique" ON "_CustomerTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerTag_B_index" ON "_CustomerTag"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLocation" ADD CONSTRAINT "ServiceLocation_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLocation" ADD CONSTRAINT "ServiceLocation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLocation" ADD CONSTRAINT "ServiceLocation_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waterbody" ADD CONSTRAINT "Waterbody_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waterbody" ADD CONSTRAINT "Waterbody_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waterbody" ADD CONSTRAINT "Waterbody_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "ServiceLocation"("service_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waterbody" ADD CONSTRAINT "Waterbody_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderType" ADD CONSTRAINT "WorkOrderType_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "ServiceLocation"("service_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_work_order_type_id_fkey" FOREIGN KEY ("work_order_type_id") REFERENCES "WorkOrderType"("work_order_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "WorkOrder"("work_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosage" ADD CONSTRAINT "Dosage_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosage" ADD CONSTRAINT "Dosage_active_service_id_fkey" FOREIGN KEY ("active_service_id") REFERENCES "ActiveService"("active_service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_active_service_id_fkey" FOREIGN KEY ("active_service_id") REFERENCES "ActiveService"("active_service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceChecklist" ADD CONSTRAINT "ServiceChecklist_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceChecklist" ADD CONSTRAINT "ServiceChecklist_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceChecklist" ADD CONSTRAINT "ServiceChecklist_active_service_id_fkey" FOREIGN KEY ("active_service_id") REFERENCES "ActiveService"("active_service_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "ServiceLocation"("service_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNeeded" ADD CONSTRAINT "ItemNeeded_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNeeded" ADD CONSTRAINT "ItemNeeded_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "ServiceLocation"("service_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveService" ADD CONSTRAINT "ActiveService_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "WorkOrder"("work_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_waterbody_id_fkey" FOREIGN KEY ("waterbody_id") REFERENCES "Waterbody"("waterbody_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_service_location_id_fkey" FOREIGN KEY ("service_location_id") REFERENCES "ServiceLocation"("service_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_work_order_type_id_fkey" FOREIGN KEY ("work_order_type_id") REFERENCES "WorkOrderType"("work_order_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkOrder" ADD CONSTRAINT "ActiveWorkOrder_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emailDetail" ADD CONSTRAINT "emailDetail_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMailDetail" ADD CONSTRAINT "ServiceMailDetail_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSkippedMailDetail" ADD CONSTRAINT "ServiceSkippedMailDetail_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerTag" ADD CONSTRAINT "_CustomerTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerTag" ADD CONSTRAINT "_CustomerTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
