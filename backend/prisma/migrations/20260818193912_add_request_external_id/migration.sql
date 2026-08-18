/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `ServiceRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "externalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_externalId_key" ON "ServiceRequest"("externalId");
