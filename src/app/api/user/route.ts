import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const { email, password } = await req.json();

    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    })
    var token = null;
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: "Usuário ou senha incorretos" }, { status: 401 });
    }

    if (user) {
        const id = user.id;
        token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    }

    return NextResponse.json({ user, token });
}