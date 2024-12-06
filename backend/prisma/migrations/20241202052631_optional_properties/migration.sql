-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'ROOM', 'HOUSE');

-- CreateEnum
CREATE TYPE "RentalPeriod" AS ENUM ('WEEKLY', 'MONTHLY', 'TRIMESTERLY', 'HALF_YEARLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('BEDROOM', 'KITCHEN', 'LIVING', 'DINNING', 'LAUNDRY', 'STUDY', 'GARAGE', 'BATHROOM');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('INTERNET', 'WATER', 'CLEANING', 'WASHING_MACHINE', 'AIR_CONDITIONER', 'HEATER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "last_name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR(255),
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "remember_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "property_type" "PropertyType" NOT NULL DEFAULT 'ROOM',
    "max_occupants" SMALLINT NOT NULL,
    "payment_by_period" DECIMAL(10,2) NOT NULL,
    "min_rental_period" "RentalPeriod" NOT NULL DEFAULT 'MONTHLY',
    "is_furnished" BOOLEAN NOT NULL DEFAULT false,
    "is_services_included" BOOLEAN NOT NULL DEFAULT false,
    "rating" SMALLINT DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "location_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "quantity" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomsOnProperty" (
    "property_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "RoomsOnProperty_pkey" PRIMARY KEY ("property_id","room_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicesOnProperty" (
    "property_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "ServicesOnProperty_pkey" PRIMARY KEY ("property_id","service_id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DECIMAL(10,6) NOT NULL,
    "longitud" DECIMAL(10,6) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location_id" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NearLocation" (
    "id" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,

    CONSTRAINT "NearLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyPhoto" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "PropertyPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Property_location_id_key" ON "Property"("location_id");

-- CreateIndex
CREATE INDEX "Property_min_rental_period_payment_by_period_is_furnished_i_idx" ON "Property"("min_rental_period", "payment_by_period", "is_furnished", "is_services_included", "rating", "city", "property_type");

-- CreateIndex
CREATE UNIQUE INDEX "Room_type_quantity_key" ON "Room"("type", "quantity");

-- CreateIndex
CREATE UNIQUE INDEX "Service_type_key" ON "Service"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Location_latitude_longitud_key" ON "Location"("latitude", "longitud");

-- CreateIndex
CREATE UNIQUE INDEX "University_location_id_key" ON "University"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "NearLocation_property_id_key" ON "NearLocation"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "NearLocation_university_id_key" ON "NearLocation"("university_id");

-- CreateIndex
CREATE UNIQUE INDEX "NearLocation_property_id_university_id_key" ON "NearLocation"("property_id", "university_id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyPhoto_property_id_key" ON "PropertyPhoto"("property_id");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsOnProperty" ADD CONSTRAINT "RoomsOnProperty_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomsOnProperty" ADD CONSTRAINT "RoomsOnProperty_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnProperty" ADD CONSTRAINT "ServicesOnProperty_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnProperty" ADD CONSTRAINT "ServicesOnProperty_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearLocation" ADD CONSTRAINT "NearLocation_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NearLocation" ADD CONSTRAINT "NearLocation_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyPhoto" ADD CONSTRAINT "PropertyPhoto_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
