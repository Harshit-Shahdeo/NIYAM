import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const institution = await prisma.institution.upsert({
        where: {
            code: 'NIYAM-DEMO',
        },
        update: {},
        create: {
            name: 'NIYAM Demo Institution',
            code: 'NIYAM-DEMO',
        },
    });

    const user = await prisma.user.upsert({
        where: {
            id: 'student_001',
        },
        update: {
            institutionId: institution.id,
            role: 'STUDENT',
        },
        create: {
            id: 'student_001',
            institutionId: institution.id,
            name: 'Demo Student',
            email: 'student001@niyam.demo',
            role: 'STUDENT',
        },
    });

    const resource = await prisma.resource.upsert({
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
        user,
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