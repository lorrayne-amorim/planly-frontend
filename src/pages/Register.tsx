import { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, birthDate, email, password }),
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            navigate("/login");
        } else {
            alert("Erro ao cadastrar");
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#1a1a1d] rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="text-center">
                    <img alt="Planly by Lorrayne" src={logo} className="mx-auto h-12 w-auto" />
                    <h2 className="mt-4 text-3xl font-bold text-purple-400">Crie sua conta</h2>
                    <p className="text-sm text-gray-400">Organize suas tarefas com leveza.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-sm text-gray-300">
                    <div>
                        <label htmlFor="name" className="block mb-1">Nome completo</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md bg-[#2a2a2d] text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="birthDate" className="block mb-1">Data de nascimento</label>
                        <input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            required
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full rounded-md bg-[#2a2a2d] text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md bg-[#2a2a2d] text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md bg-[#2a2a2d] text-white border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-medium py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Cadastrar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Já possui uma conta?{' '}
                    <a href="/login" className="text-purple-400 hover:underline">Entrar</a>
                </p>
            </div>
        </div>
    );
}
