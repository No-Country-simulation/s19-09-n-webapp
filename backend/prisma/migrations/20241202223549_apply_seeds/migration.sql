/*
  Warnings:

  - You are about to drop the column `location_id` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `PropertyPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `University` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `city` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `photo_base_64` to the `PropertyPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('CORDOBA', 'BUENOS_AIRES', 'MENDOZA', 'SALTA', 'TUCUMAN', 'JUJUY', 'CHACO', 'MISIONES', 'LA_RIOJA', 'SAN_JUAN', 'SAN_LUIS');

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_location_id_fkey";

-- DropForeignKey
ALTER TABLE "University" DROP CONSTRAINT "University_location_id_fkey";

-- DropIndex
DROP INDEX "Property_location_id_key";

-- DropIndex
DROP INDEX "University_location_id_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "location_id",
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL;

-- AlterTable
ALTER TABLE "PropertyPhoto" DROP COLUMN "photo_url",
ADD COLUMN     "photo_base_64" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "University" DROP COLUMN "location_id",
ADD COLUMN     "latitude" DECIMAL(10,6) NOT NULL,
ADD COLUMN     "longitud" DECIMAL(10,6) NOT NULL;

-- DropTable
DROP TABLE "Location";

-- CreateIndex
CREATE INDEX "Property_min_rental_period_payment_by_period_is_furnished_i_idx" ON "Property"("min_rental_period", "payment_by_period", "is_furnished", "is_services_included", "rating", "city", "property_type");
