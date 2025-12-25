/*
  Warnings:

  - You are about to drop the column `area` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `region` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "area",
DROP COLUMN "city",
DROP COLUMN "division",
ADD COLUMN     "region" TEXT NOT NULL;
