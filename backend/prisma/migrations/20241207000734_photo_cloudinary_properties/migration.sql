/*
  Warnings:

  - You are about to drop the column `photo_base_64` on the `PropertyPhoto` table. All the data in the column will be lost.
  - Added the required column `photo_service_id` to the `PropertyPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_url` to the `PropertyPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PropertyPhoto_property_id_key";

-- AlterTable
ALTER TABLE "PropertyPhoto" DROP COLUMN "photo_base_64",
ADD COLUMN     "photo_service_id" TEXT NOT NULL,
ADD COLUMN     "photo_url" TEXT NOT NULL;
