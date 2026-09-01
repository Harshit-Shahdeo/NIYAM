-- CreateTable
CREATE TABLE "SemesterResult" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "sgpa" DECIMAL(4,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SemesterResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultSubject" (
    "id" TEXT NOT NULL,
    "semesterResultId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SemesterResult_institutionId_idx" ON "SemesterResult"("institutionId");

-- CreateIndex
CREATE INDEX "SemesterResult_studentProfileId_idx" ON "SemesterResult"("studentProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "SemesterResult_studentProfileId_semester_key" ON "SemesterResult"("studentProfileId", "semester");

-- CreateIndex
CREATE INDEX "ResultSubject_semesterResultId_idx" ON "ResultSubject"("semesterResultId");

-- CreateIndex
CREATE UNIQUE INDEX "ResultSubject_semesterResultId_courseCode_key" ON "ResultSubject"("semesterResultId", "courseCode");

-- AddForeignKey
ALTER TABLE "SemesterResult" ADD CONSTRAINT "SemesterResult_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterResult" ADD CONSTRAINT "SemesterResult_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultSubject" ADD CONSTRAINT "ResultSubject_semesterResultId_fkey" FOREIGN KEY ("semesterResultId") REFERENCES "SemesterResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
