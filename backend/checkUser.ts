import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUser() {
    const user = await prisma.user.findUnique({
        where: { email: 'bov@mailinator.com' }
    });
    console.log('User found:', user ? { id: user.id, email: user.email, role: user.role } : 'Not found');
    await prisma.$disconnect();
}

checkUser();
