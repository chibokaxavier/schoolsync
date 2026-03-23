import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js'; // Ensure the .js extension is here if needed

// Helper for error messages
const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, role, firstName, lastName, staffId, subject, regNumber, grade, phoneNumber, address, secretKey } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Missing email, password, or role' });
        }

        // Security: Prevent impersonation
        if (role.toUpperCase() === 'TEACHER') {
            const teacherSecret = process.env.TEACHER_SIGNUP_SECRET || 'school-teacher-2025';
            if (secretKey !== teacherSecret) {
                return res.status(403).json({ error: 'Invalid teacher verification key' });
            }
        }

        if (role.toUpperCase() === 'ADMIN') {
            const adminSecret = process.env.ADMIN_SIGNUP_SECRET || 'super-admin-2025';
            if (secretKey !== adminSecret) {
                return res.status(403).json({ error: 'Invalid admin verification key' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Transaction ensures if the Profile fails, the User isn't created
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: role.toUpperCase(),
                },
            });

            if (role.toUpperCase() === 'STUDENT') {
                await tx.student.create({
                    data: { firstName, lastName, regNumber, grade: Number(grade), userId: user.id }
                });
            } else if (role.toUpperCase() === 'TEACHER') {
                await tx.teacher.create({
                    data: { firstName, lastName, staffId, subject, userId: user.id }
                });
            } else if (role.toUpperCase() === 'PARENT') {
                await tx.parent.create({
                    data: { firstName, lastName, phoneNumber, address, userId: user.id }
                });
            }
            return user;
        });

        res.status(201).json({ message: 'User created!', userId: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Signup failed', details: getErrorMessage(error) });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: getErrorMessage(error) });
    }
};