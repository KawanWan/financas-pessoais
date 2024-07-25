import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { promisify } from 'util';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
    const {cookieToken} = await req.json();
    var user = null;
    
    if (cookieToken) {
        const decoded = await promisify(jwt.verify)(cookieToken,
            process.env.JWT_SECRET
        );
        
        const id = decoded.id;

        user = await prisma.users.findUnique({
            where: {
                id: id
            },
        })
    }
    

    return NextResponse.json(user);
}