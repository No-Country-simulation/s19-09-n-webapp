/*
  Warnings:

  - You are about to drop the column `longitud` on the `University` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `University` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[city,country,name]` on the table `University` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NearLocation_property_id_key";

-- DropIndex
DROP INDEX "NearLocation_university_id_key";

-- AlterTable
ALTER TABLE "University" DROP COLUMN "longitud",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "city" VARCHAR(128) NOT NULL,
ADD COLUMN     "country" CHAR(2) NOT NULL DEFAULT 'AR',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" VARCHAR(512),
ADD COLUMN     "longitude" DECIMAL(10,6),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE INDEX "University_city_country_name_idx" ON "University"("city", "country", "name");

-- CreateIndex
CREATE UNIQUE INDEX "University_city_country_name_key" ON "University"("city", "country", "name");
