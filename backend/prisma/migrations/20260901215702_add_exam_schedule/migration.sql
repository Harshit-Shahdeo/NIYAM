-- CreateTable
CREATE TABLE "ExamSchedule" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "courseCode" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "examDate" DATE NOT NULL,
    "examTime" TEXT NOT NULL,
    "examCenter" TEXT NOT NULL,

    CONSTRAINT "ExamSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExamSchedule_institutionId_program_semester_idx" ON "ExamSchedule"("institutionId", "program", "semester");

-- AddForeignKey
ALTER TABLE "ExamSchedule" ADD CONSTRAINT "ExamSchedule_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
