import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { saveToken } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            saveToken(data.token);
            alert("Login realizado com sucesso!");
            navigate("/");
        } else {
            alert("Email ou senha inválidos");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-6 sm:p-8">
                <div className="text-center">
                    <img
                        alt="Logo Planly"
                        src={logo}
                        className="mx-auto h-10 w-auto mb-2"
                    />
                    <h2 className="text-2xl font-bold text-purple-400 tracking-wide">Bem-vindo de volta</h2>
                    <p className="text-sm text-gray-400">Entre para continuar usando o Planly</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex justify-end text-sm">
                        <a
                            href="/forgot-password"
                            className="text-purple-400 hover:underline hover:text-purple-300"
                        >
                            Esqueci minha senha
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center rounded-md bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Entrar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Não tem conta?{" "}
                    <a
                        href="/register"
                        className="font-semibold text-purple-400 hover:text-purple-300 hover:underline"
                    >
                        Registre-se gratuitamente
                    </a>
                </p>
            </div>
        </div>
    );
}
