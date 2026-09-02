import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const studentPasswordHash = await bcrypt.hash(
        'student123',
        10,
    );

    const facultyPasswordHash = await bcrypt.hash(
        'faculty123',
        10,
    );

    const adminPasswordHash = await bcrypt.hash(
        'admin123',
        10,
    );

    /*
     * Institution
     */
    const institution =
        await prisma.institution.upsert({
            where: {
                code: 'NIYAM-DEMO',
            },
            update: {},
            create: {
                name: 'NIYAM Demo Institution',
                code: 'NIYAM-DEMO',
            },
        });

    /*
     * Department
     */
    const department =
        await prisma.department.upsert({
            where: {
                institutionId_code: {
                    institutionId: institution.id,
                    code: 'CSE',
                },
            },
            update: {
                name: 'Computer Science and Engineering',
            },
            create: {
                institutionId: institution.id,
                name: 'Computer Science and Engineering',
                code: 'CSE',
            },
        });

    /*
     * Student 001
     */
    const student =
        await prisma.user.upsert({
            where: {
                id: 'student_001',
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                role: 'STUDENT',
                passwordHash: studentPasswordHash,
                isActive: true,
            },
            create: {
                id: 'student_001',
                institutionId: institution.id,
                departmentId: department.id,
                name: 'Demo Student',
                email: 'student001@niyam.demo',
                role: 'STUDENT',
                passwordHash: studentPasswordHash,
                isActive: true,
            },
        });

    /*
     * Student 001 academic profile
     */
    const studentProfile =
        await prisma.studentProfile.upsert({
            where: {
                userId: student.id,
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                enrollmentNumber: 'NIYAM2026001',
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                cgpa: 8.2,
                attendancePercentage: 87.5,
            },
            create: {
                institutionId: institution.id,
                userId: student.id,
                departmentId: department.id,
                enrollmentNumber: 'NIYAM2026001',
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                cgpa: 8.2,
                attendancePercentage: 87.5,
            },
        });

    /*
     * Student 002
     */
    const studentTwo =
        await prisma.user.upsert({
            where: {
                id: 'student_002',
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                role: 'STUDENT',
                passwordHash: studentPasswordHash,
                isActive: true,
            },
            create: {
                id: 'student_002',
                institutionId: institution.id,
                departmentId: department.id,
                name: 'Second Demo Student',
                email: 'student002@niyam.demo',
                role: 'STUDENT',
                passwordHash: studentPasswordHash,
                isActive: true,
            },
        });

    /*
     * Student 002 academic profile
     */
    const studentTwoProfile =
        await prisma.studentProfile.upsert({
            where: {
                userId: studentTwo.id,
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                enrollmentNumber: 'NIYAM2026002',
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                cgpa: 7.4,
                attendancePercentage: 76.5,
            },
            create: {
                institutionId: institution.id,
                userId: studentTwo.id,
                departmentId: department.id,
                enrollmentNumber: 'NIYAM2026002',
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                cgpa: 7.4,
                attendancePercentage: 76.5,
            },
        });

    /*
     * Faculty
     */
    const faculty =
        await prisma.user.upsert({
            where: {
                id: 'faculty_001',
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                role: 'FACULTY',
                passwordHash: facultyPasswordHash,
                isActive: true,
            },
            create: {
                id: 'faculty_001',
                institutionId: institution.id,
                departmentId: department.id,
                name: 'Demo Faculty',
                email: 'faculty001@niyam.demo',
                role: 'FACULTY',
                passwordHash: facultyPasswordHash,
                isActive: true,
            },
        });

    /*
     * Administrator
     */
    const admin =
        await prisma.user.upsert({
            where: {
                id: 'admin_001',
            },
            update: {
                institutionId: institution.id,
                departmentId: department.id,
                role: 'ADMIN',
                passwordHash: adminPasswordHash,
                isActive: true,
            },
            create: {
                id: 'admin_001',
                institutionId: institution.id,
                departmentId: department.id,
                name: 'Demo Administrator',
                email: 'admin001@niyam.demo',
                role: 'ADMIN',
                passwordHash: adminPasswordHash,
                isActive: true,
            },
        });

    /*
     * Resource
     */
    const resource =
        await prisma.resource.upsert({
            where: {
                id: 'robotics-lab',
            },
            update: {
                institutionId: institution.id,
                type: 'LAB',
            },
            create: {
                id: 'robotics-lab',
                institutionId: institution.id,
                name: 'robotics-lab',
                type: 'LAB',
                location: 'Engineering Block',
            },
        });

    /*
     * Student 001 Semester Result
     */
    const studentOneResult = await prisma.semesterResult.upsert({
        where: {
            studentProfileId_semester: {
                studentProfileId: studentProfile.id,
                semester: 5,
            },
        },
        update: {
            sgpa: 8.4,
        },
        create: {
            institutionId: institution.id,
            studentProfileId: studentProfile.id,
            semester: 5,
            sgpa: 8.4,
        },
    });

    const studentOneSubjectsData = [
        { courseCode: 'FMI301', courseName: 'Fundamental Machine Intelligence', credits: 4, marks: 85, grade: 'A' },
        { courseCode: 'IML302', courseName: 'Introduction to Machine Learning', credits: 4, marks: 82, grade: 'A' },
        { courseCode: 'CNW303', courseName: 'Computer Networks', credits: 3, marks: 78, grade: 'B+' },
        { courseCode: 'CPR304', courseName: 'C Programming', credits: 3, marks: 91, grade: 'O' },
        { courseCode: 'OSY305', courseName: 'Operating System', credits: 4, marks: 75, grade: 'B+' },
    ];

    for (const subject of studentOneSubjectsData) {
        await prisma.resultSubject.upsert({
            where: {
                semesterResultId_courseCode: {
                    semesterResultId: studentOneResult.id,
                    courseCode: subject.courseCode,
                },
            },
            update: subject,
            create: {
                ...subject,
                semesterResultId: studentOneResult.id,
            },
        });
    }

    /*
     * Student 002 Semester Result
     */
    const studentTwoResult = await prisma.semesterResult.upsert({
        where: {
            studentProfileId_semester: {
                studentProfileId: studentTwoProfile.id,
                semester: 5,
            },
        },
        update: {
            sgpa: 7.2,
        },
        create: {
            institutionId: institution.id,
            studentProfileId: studentTwoProfile.id,
            semester: 5,
            sgpa: 7.2,
        },
    });

    const studentTwoSubjectsData = [
        { courseCode: 'FMI301', courseName: 'Fundamental Machine Intelligence', credits: 4, marks: 72, grade: 'B' },
        { courseCode: 'IML302', courseName: 'Introduction to Machine Learning', credits: 4, marks: 68, grade: 'C+' },
        { courseCode: 'CNW303', courseName: 'Computer Networks', credits: 3, marks: 74, grade: 'B' },
        { courseCode: 'CPR304', courseName: 'C Programming', credits: 3, marks: 81, grade: 'A' },
        { courseCode: 'OSY305', courseName: 'Operating System', credits: 4, marks: 65, grade: 'C' },
    ];

    for (const subject of studentTwoSubjectsData) {
        await prisma.resultSubject.upsert({
            where: {
                semesterResultId_courseCode: {
                    semesterResultId: studentTwoResult.id,
                    courseCode: subject.courseCode,
                },
            },
            update: subject,
            create: {
                ...subject,
                semesterResultId: studentTwoResult.id,
            },
        });
    }

    /*
     * Exam Schedule for Semester 5 B.Tech CSE
     */
    const examSchedulesData = [
        { courseCode: 'FMI301', subjectName: 'Fundamental Machine Intelligence', examDate: new Date('2026-11-15T00:00:00Z'), examTime: '10:00 AM - 01:00 PM', examCenter: 'Hall A, Main Block' },
        { courseCode: 'IML302', subjectName: 'Introduction to Machine Learning', examDate: new Date('2026-11-17T00:00:00Z'), examTime: '10:00 AM - 01:00 PM', examCenter: 'Hall A, Main Block' },
        { courseCode: 'CNW303', subjectName: 'Computer Networks', examDate: new Date('2026-11-19T00:00:00Z'), examTime: '10:00 AM - 01:00 PM', examCenter: 'Hall B, South Block' },
        { courseCode: 'CPR304', subjectName: 'C Programming', examDate: new Date('2026-11-21T00:00:00Z'), examTime: '02:00 PM - 05:00 PM', examCenter: 'Lab Complex 1' },
        { courseCode: 'OSY305', subjectName: 'Operating System', examDate: new Date('2026-11-24T00:00:00Z'), examTime: '10:00 AM - 01:00 PM', examCenter: 'Hall A, Main Block' },
    ];

    for (const schedule of examSchedulesData) {
        const existingSchedule = await prisma.examSchedule.findFirst({
            where: {
                institutionId: institution.id,
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                courseCode: schedule.courseCode,
            }
        });

        if (!existingSchedule) {
            await prisma.examSchedule.create({
                data: {
                    institutionId: institution.id,
                    program: 'B.Tech Computer Science and Engineering',
                    semester: 5,
                    ...schedule
                }
            });
        } else {
            await prisma.examSchedule.update({
                where: { id: existingSchedule.id },
                data: schedule
            });
        }
    }

    console.log({
        institution,
        department,
        student,
        studentProfile,
        studentOneResult,
        studentTwo,
        studentTwoProfile,
        studentTwoResult,
        faculty,
        admin,
        resource,
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });