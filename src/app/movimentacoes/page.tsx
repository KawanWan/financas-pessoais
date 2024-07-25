"use client";

import { useState, useEffect } from 'react';
import Layout from "@/components/layout";
import { useAppContext } from "@/context";

interface Movimentacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    data: string;
    categoria?: string;
    usuarioId: number;
}

export default function Home() {
    const { loggedId, user } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [formData, setFormData] = useState({
        descricao: "",
        valor: "",
        tipo: "",
        categoria: ""
    });

    const excluir = async (id: number) => {
        if (!loggedId) return;

        try {
            await fetch(`/api/movimentacoes?userId=${id}`, {
                method: 'DELETE',
            });

            setMovimentacoes(movimentacoes.filter(mov => mov.id !== id));
        } catch (error) {
            console.error('Error deleting movimentacao:', error);
        }

    }

    const editar = async (movimentacao: Movimentacao) => {
        setIsEditing(true);
        setFormData({
            descricao: movimentacao.descricao,
            valor: parseFloat(movimentacao.valor),
            tipo: movimentacao.tipo,
            categoria: movimentacao.categoria,
            id: movimentacao.id
        });
    }

    const fetchMovimentacoes = async () => {


        const response = await fetch(`/api/movimentacoes?userId=${user.id}`);
        const data = await response.json();
        setMovimentacoes(data);
    };

    useEffect(() => {
        fetchMovimentacoes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loggedId) return;

        try {
            const response = await fetch('/api/movimentacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: formData.descricao,
                    valor: parseFloat(formData.valor),
                    tipo: formData.tipo,
                    categoria: formData.categoria,
                    usuarioId: user.id,
                    data: new Date().toISOString()
                }),
            });

            const newMovimentacao = await response.json();
            setMovimentacoes([...movimentacoes, newMovimentacao]);

            setFormData({
                descricao: "",
                valor: "",
                tipo: "",
                categoria: ""
            });
        } catch (error) {
            console.error('Error adding movimentacao:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loggedId) return;
        
        try {
            const response = await fetch(`/api/movimentacoes?movimentacaoId=${formData.id}}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: formData.descricao,
                    valor: parseFloat(formData.valor),
                    tipo: formData.tipo,
                    categoria: formData.categoria,
                    usuarioId: loggedId,
                    data: new Date().toISOString()
                }),
            });

            const updatedMovimentacao = await response.json();
            setMovimentacoes(movimentacoes.map(mov => (mov.id === formData.id ? updatedMovimentacao : mov)));
            setFormData({
                id: 0,
                descricao: "",
                valor: "",
                tipo: "",
                categoria: ""
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating movimentacao:', error);
        }
    };

    return (
        <>
            <Layout />

            <div className="container mt-4">

                <div className="jumbotron">
                    <h1 className="display-4">Movimentações</h1>

                    <div className="card mt-5">
                        <div className="card-header">
                            Adicionar Movimentação
                        </div>
                        <div className="card-body">
                            <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
                                <div className="form-group mt-2">
                                    <label>Descrição</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Valor</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="valor"
                                        value={formData.valor}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Tipo</label>
                                    <select
                                        className="form-control"
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Escolha um tipo</option>
                                        <option value="RECEITA">Receita</option>
                                        <option value="DESPESA">Despesa</option>
                                    </select>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                    />
                                </div>
                                {isEditing ? (<>
                                    <button type="submit" className="btn btn-primary mt-2">Atualizar Movimentação</button>
                                </>) : (<>
                                    <button type="submit" className="btn btn-primary mt-2">Adicionar Movimentação</button>
                                </>)}

                            </form>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2>Lista de Movimentações</h2>
                        <ol className="list-group list-group-numbered">
                            {movimentacoes.length === 0 ? (
                                <li className="list-group-item">Nenhuma movimentação encontrada</li>
                            ) : (
                                movimentacoes.map((movimentacao) => (
                                    <li key={movimentacao.id} className="list-group-item d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{movimentacao.descricao}</div>
                                            R$ {movimentacao.valor} - {movimentacao.tipo} <br />


                                        </div>
                                        <div>
                                            <span className="badge text-bg-primary rounded-pill d-flex justify-content-center">
                                                {new Date(movimentacao.data).toLocaleDateString()}

                                            </span>

                                            <div className='d-flex justify-content-end mt-2 gap-2'>

                                                <button type="button" className="btn btn-sm btn-outline-warning " onClick={() => editar(movimentacao)}>Editar</button>
                                                <button type="button" className="btn btn-sm btn-outline-danger " data-id={movimentacao.id} onClick={() => excluir(movimentacao.id)}>Excluir</button>
                                            </div>
                                        </div>

                                    </li>
                                ))
                            )}
                        </ol>
                    </div>



                </div>
            </div>
        </>
    );
}
