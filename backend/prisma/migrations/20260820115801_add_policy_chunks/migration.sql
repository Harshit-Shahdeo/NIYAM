-- CreateTable
CREATE TABLE "PolicyChunk" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PolicyChunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PolicyChunk_documentId_idx" ON "PolicyChunk"("documentId");
