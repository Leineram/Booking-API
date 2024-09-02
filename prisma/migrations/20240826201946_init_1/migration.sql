/*
  Warnings:

  - You are about to drop the column `property` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `property` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Review` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostid` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_property_idx` ON `Booking`;

-- DropIndex
DROP INDEX `Booking_user_idx` ON `Booking`;

-- DropIndex
DROP INDEX `Property_host_idx` ON `Property`;

-- DropIndex
DROP INDEX `Review_property_idx` ON `Review`;

-- DropIndex
DROP INDEX `Review_user_idx` ON `Review`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `property`,
    DROP COLUMN `user`,
    ADD COLUMN `propertyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Property` DROP COLUMN `host`,
    ADD COLUMN `hostid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `property`,
    DROP COLUMN `user`,
    ADD COLUMN `propertyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Booking_propertyId_idx` ON `Booking`(`propertyId`);

-- CreateIndex
CREATE INDEX `Booking_userId_idx` ON `Booking`(`userId`);

-- CreateIndex
CREATE INDEX `Property_hostid_idx` ON `Property`(`hostid`);

-- CreateIndex
CREATE INDEX `Review_propertyId_idx` ON `Review`(`propertyId`);

-- CreateIndex
CREATE INDEX `Review_userId_idx` ON `Review`(`userId`);
