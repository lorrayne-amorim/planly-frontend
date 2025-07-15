import type { Board, NewBoard } from "../types/Board";

const API_URL = "https://planly-api-l6ie.onrender.com";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getBoards(): Promise<Board[]> {
  const response = await fetch(`${API_URL}/boards`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error("Erro ao buscar boards");
  return await response.json();
}

export async function getBoardById(id: string): Promise<Board | null> {
  const response = await fetch(`${API_URL}/boards/${id}`, { headers: getAuthHeaders() });
  if (!response.ok) return null;
  return await response.json();
}

export async function createBoard(name: string): Promise<Board> {
  const newBoard: NewBoard = {
    name,
    columns: {
      todo: { name: "To do", items: [] },
      inProgress: { name: "Doing", items: [] },
      done: { name: "Done", items: [] },
    },
  };

  const response = await fetch(`${API_URL}/boards`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(newBoard),
  });

  const res = await response.json();
  if (!response.ok) throw new Error(res.detail || "Erro ao criar board");
  return res;
}

export async function updateBoard(boardId: string, data: Partial<Board>): Promise<Board> {
  const response = await fetch(`${API_URL}/boards/${boardId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (!response.ok) throw new Error(res.detail || "Erro ao atualizar board");
  return res;
}

export async function deleteTask(boardId: string, columnId: string, taskId: string) {
  const response = await fetch(`${API_URL}/boards/${boardId}/tasks?columnId=${columnId}&taskId=${taskId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erro ao deletar tarefa");
  return await response.json();
}

export async function deleteBoardById(boardId: string) {
  const response = await fetch(`${API_URL}/boards/${boardId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Erro ao deletar o board");
  return await response.json();
}
