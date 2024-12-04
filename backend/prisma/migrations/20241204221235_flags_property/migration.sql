-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true;
