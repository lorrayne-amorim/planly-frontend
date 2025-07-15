import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardById, updateBoard, deleteTask } from "../services/api";
import type { Board, ColumnType, Task } from "../types/Board";
import { Column } from "../components/Column";

export const BoardPage = () => {
    const { id } = useParams();
    const [board, setBoard] = useState<Board | null>(null);
    const [draggedTask, setDraggedTask] = useState<{ columnId: ColumnType; task: Task } | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const navigate = useNavigate();

    function isLoggedIn(): boolean {
        return !!localStorage.getItem("token");
    }

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        if (id) {
            getBoardById(id).then(setBoard);
        }
    }, [id, navigate]);

    function handleDragStart(columnId: ColumnType, task: Task) {
        setDraggedTask({ columnId, task });
    }

    function handleDrop(targetColumnId: ColumnType) {
        if (!draggedTask || !board) return;

        const { columnId: sourceColumnId, task } = draggedTask;
        if (sourceColumnId === targetColumnId) return;

        const updated = { ...board };
        updated.columns[sourceColumnId].items = updated.columns[sourceColumnId].items.filter(t => t.id !== task.id);
        updated.columns[targetColumnId].items.push(task);

        updateBoard(board._id, { name: updated.name, columns: updated.columns }).then(setBoard);
        setDraggedTask(null);
    }

    function handleAddTask(columnId: ColumnType, content: string) {
        if (!board) return;

        const newTask = {
            id: Date.now().toString(),
            content,
            completed: false,
        };

        const updated = { ...board };
        updated.columns[columnId].items.push(newTask);

        updateBoard(board._id, { name: updated.name, columns: updated.columns }).then(setBoard);
    }

    function handleRemoveTask(columnId: ColumnType, taskId: string) {
        if (!board) return;

        deleteTask(board._id, columnId, taskId).then(() => {
            const updated = { ...board };
            updated.columns[columnId].items = updated.columns[columnId].items.filter(item => item.id !== taskId);
            setBoard(updated);
        });
    }

    function handleUpdateBoardName() {
        if (!board) return;
        const updated = { ...board, name: editedName };
        updateBoard(board._id, { name: updated.name, columns: updated.columns }).then((newBoard) => {
            setBoard(newBoard);
            setIsEditing(false);
        });
    }

    function handleUpdateTask(columnId: ColumnType, taskId: string, newContent: string) {
        if (!board) return;

        const updated = { ...board };
        updated.columns[columnId].items = updated.columns[columnId].items.map((task) =>
            task.id === taskId ? { ...task, content: newContent } : task
        );

        updateBoard(board._id, { name: updated.name, columns: updated.columns }).then(setBoard);
    }

    function handleToggleComplete(columnId: ColumnType, taskId: string, currentState: boolean) {
        if (!board) return;

        const updated = { ...board };
        updated.columns[columnId].items = updated.columns[columnId].items.map((task) =>
            task.id === taskId ? { ...task, completed: !currentState } : task
        );

        updateBoard(board._id, { name: updated.name, columns: updated.columns }).then(setBoard);
    }

    if (!board || !board.columns) {
        return <div className="text-white p-6">Carregando quadro...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center text-gray-900">
            {isEditing ? (
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleUpdateBoardName}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdateBoardName();
                    }}
                    autoFocus
                    className="bg-white px-4 py-3 rounded-md shadow border border-gray-200 w-full max-w-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            ) : (
                <h2
                    className="text-3xl sm:text-4xl font-bold text-purple-600 mb-6 cursor-pointer transition hover:text-purple-500 text-center"
                    onDoubleClick={() => {
                        setIsEditing(true);
                        setEditedName(board.name);
                    }}
                >
                    Quadro: {board.name}
                </h2>
            )}

            <div className="w-full max-w-full overflow-x-auto pb-6">
                <div className="flex flex-col sm:flex-row justify-center gap-6 items-start min-w-[600px] sm:min-w-full">
                    {(Object.keys(board.columns) as ColumnType[]).map((key) => {
                        const column = board.columns[key];
                        return (
                            <Column
                                key={key}
                                columnId={key}
                                columnName={column.name}
                                tasks={column.items}
                                onAddTask={handleAddTask}
                                onRemoveTask={handleRemoveTask}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                                onUpdateTask={handleUpdateTask}
                                onToggleComplete={handleToggleComplete}
                            />
                        );
                    })}
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">🖱️ Dê dois cliques em um nome ou tarefa para editar</p>
        </div>
    );
};
