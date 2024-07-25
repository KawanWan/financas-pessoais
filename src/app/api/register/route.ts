import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        if (error instanceof PrismaClient.PrismaClientKnownRequestError && error.code === "P2002") {
            return NextResponse.json({ message: "Email já está em uso" }, { status: 409 });
        } else {

        }
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}
