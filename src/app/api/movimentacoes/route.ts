import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { descricao, valor, tipo, data, categoria, usuarioId } = await req.json();

    if (!descricao || !valor || !tipo || !data) {
        return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    try {
        const movimentacao = await prisma.movimentacoes.create({
            data: {
                descricao: descricao,
                valor: parseFloat(valor),
                tipo,
                data: new Date(data),
                categoria: categoria,
                user: {
                    connect: { id: usuarioId }
                }

                
            },
        });

        return NextResponse.json(movimentacao, { status: 201 });
    } catch (error) {
        
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    const movimentacoes = await prisma.movimentacoes.findMany({
        where: {
            userId: parseInt(userId, 10),
        },
    })

    return NextResponse.json(movimentacoes, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('userId');

    if (!id) {
        return NextResponse.json({ message: "ID é obrigatório" }, { status: 400 });
    }

    try {
        await prisma.movimentacoes.delete({
            where: { id: parseInt(id, 10) },
        });
        return NextResponse.json({ message: "Movimentação excluída com sucesso" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('movimentacaoId');
    const { descricao, valor, tipo, data, categoria, usuarioId } = await req.json();

    if (!id || !descricao || !valor || !tipo || !data) {
        return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    try {
        const updatedMovimentacao = await prisma.movimentacoes.update({
            where: { id: parseInt(id, 10) },
            data: {
                descricao,
                valor: parseFloat(valor),
                tipo,
                data: new Date(data),
                categoria,
            },
        });

        return NextResponse.json(updatedMovimentacao, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}
