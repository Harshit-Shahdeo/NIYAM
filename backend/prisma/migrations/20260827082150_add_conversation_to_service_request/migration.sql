-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "conversationId" TEXT;

-- CreateIndex
CREATE INDEX "ServiceRequest_conversationId_idx" ON "ServiceRequest"("conversationId");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
