import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testInternal() {
    const email = 'self@test.com';
    const password = 'real-password-123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create
    await prisma.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: { email, password: hashedPassword, role: 'STUDENT' }
    });
    console.log('User created/updated');

    // Compare
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match test:', isMatch);
    }
    await prisma.$disconnect();
}

testInternal();
