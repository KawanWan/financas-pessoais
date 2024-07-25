"use client";

import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { useAppContext } from '@/context';

export default function Profile() {
    const { loggedId, user } = useAppContext();
    const [loading, setLoading] = useState(true);

    if (!loggedId) {
        window.location.href = "/login"
    }

    return (
        <>
            <Layout />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-4">
                        <div className="card p-12">
                            <div className="avatar-ctn">
                                <img src="/avatar.png" className="avatar card-img-top img-fluid" alt="user profile picture" />
                            </div>
                            <div className="card-body mt-2 d-flex justify-content-center flex-column">
                                <div className='d-flex justify-content-center'>
                                    <h4 className="card-text mb-4">Informações pessoais</h4>
                                </div>
                                <p className="card-text">Nome: {user.name}</p>
                                <p className="card-text">Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card text-center">
                            <div className="card-header">
                                Página de Perfil
                            </div>
                            <div className="card-body">
                                <p className="card-text">Seja Bem-vindo {user.name}!</p>
                                <a href="/movimentacoes" className="btn btn-primary">Minhas transações</a>
                            </div>
                            <div className="card-footer text-muted">
                                Desafio - Finanças Pessoais
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
