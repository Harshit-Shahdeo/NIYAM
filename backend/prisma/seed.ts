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
                enrollmentNumber: 'NIYAM2026_001',
                program: 'B.Tech Computer Science and Engineering',
                semester: 5,
                cgpa: 8.2,
                attendancePercentage: 87.5,
            },
            create: {
                institutionId: institution.id,
                userId: student.id,
                departmentId: department.id,
                enrollmentNumber: 'NIYAM2026_001',
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

    console.log({
        institution,
        department,
        student,
        studentProfile,
        studentTwo,
        studentTwoProfile,
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