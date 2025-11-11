-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "alias" TEXT,
ADD COLUMN     "defaultAddress" BOOLEAN NOT NULL DEFAULT false;
