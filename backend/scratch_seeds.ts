import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const schedules = await prisma.examSchedule.findMany({
        where: { program: 'B.Tech Computer Science and Engineering', semester: 5 }
    });
    console.log(JSON.stringify(schedules, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
