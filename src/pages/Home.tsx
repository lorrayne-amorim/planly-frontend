import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards, createBoard, deleteBoardById } from "../services/api";
import type { Board } from "../types/Board";

export const Home = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [newBoardName, setNewBoardName] = useState("");
    const navigate = useNavigate();

    function isLoggedIn(): boolean {
        return !!localStorage.getItem("token");
    }

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        getBoards().then(setBoards).catch(() => {
            alert("Erro ao carregar boards");
        });
    }, [navigate]);

    async function handleCreateBoard() {
        if (!newBoardName.trim()) return;

        try {
            const newBoard = await createBoard(newBoardName);
            setBoards((prev) => [...prev, newBoard]);
            setNewBoardName("");
        } catch (err) {
            alert("Erro ao criar board: " + err);
        }
    }

    async function handleDeleteBoard(boardId: string) {
        if (!confirm("Tem certeza que deseja deletar este board?")) return;

        try {
            await deleteBoardById(boardId);
            setBoards((prev) => prev.filter((board) => board._id !== boardId));
        } catch (err) {
            alert("Erro ao deletar board: " + err);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Nome do novo quadro"
                    className="p-3 flex-1 rounded border border-gray-300 bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    onClick={handleCreateBoard}
                    className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded"
                >
                    Criar
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {boards.map((board) => (
                    <div
                        key={board._id}
                        className="relative bg-gray-100 border border-gray-300 text-black p-6 rounded-md shadow hover:shadow-lg transition group"
                    >
                        <div
                            onClick={() => navigate(`/board/${board._id}`)}
                            className="cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold">{board.name}</h3>
                        </div>
                        <button
                            onClick={() => handleDeleteBoard(board._id)}
                            className="absolute top-2 right-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Deletar"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
