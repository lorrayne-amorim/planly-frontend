import type { Task, ColumnType } from "../types/Board";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

type Props = {
  columnId: ColumnType;
  columnName: string;
  tasks: Task[];
  onAddTask: (columnId: ColumnType, content: string) => void;
  onRemoveTask: (columnId: ColumnType, taskId: string) => void;
  onDragStart: (columnId: ColumnType, task: Task) => void;
  onDrop: (columnId: ColumnType) => void;
  onUpdateTask: (columnId: ColumnType, taskId: string, newContent: string) => void;
  onToggleComplete: (columnId: ColumnType, taskId: string, currentState: boolean) => void;
};

export function Column({
  columnId,
  columnName,
  tasks,
  onAddTask,
  onRemoveTask,
  onDragStart,
  onDrop,
  onUpdateTask,
  onToggleComplete,
}: Props) {
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskContent, setEditedTaskContent] = useState("");

  function handleUpdateTask(taskId: string) {
    if (!editedTaskContent.trim()) return;
    onUpdateTask(columnId, taskId, editedTaskContent);
    setEditingTaskId(null);
    setEditedTaskContent("");
  }

  function handleAdd() {
    if (!newTask.trim()) return;
    onAddTask(columnId, newTask);
    setNewTask("");
  }

  return (
    <div
      className="w-[90%] sm:w-[20rem] bg-gray-100 border border-gray-300 rounded-2xl shadow-lg p-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(columnId)}
    >
      <h3 className="text-lg font-bold text-purple-700 mb-4 tracking-wide">{columnName}</h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Sem tarefas</p>
      ) : (
        tasks.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(columnId, item)}
            className="bg-purple-50 hover:bg-purple-100 text-gray-900 p-3 rounded-lg mb-3 flex items-center justify-between gap-2 shadow-sm transition-all border border-purple-100"
          >
            <button
              onClick={() => onToggleComplete(columnId, item.id, item.completed)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${item.completed ? "bg-purple-500 border-purple-500" : "border-gray-400"
                }`}
              aria-label="Marcar como concluído"
            ></button>

            {editingTaskId === item.id ? (
              <input
                type="text"
                value={editedTaskContent}
                onChange={(e) => setEditedTaskContent(e.target.value)}
                onBlur={() => handleUpdateTask(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdateTask(item.id);
                }}
                autoFocus
                className="bg-white text-gray-900 rounded px-2 py-1 w-full text-sm shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditingTaskId(item.id);
                  setEditedTaskContent(item.content);
                }}
                className={`flex-1 text-sm truncate ${item.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {item.content}
              </span>
            )}

            {/* Remover */}
            <button
              onClick={() => onRemoveTask(columnId, item.id)}
              className="text-gray-400 hover:text-red-500 transition"
              title="Remover"
            >
              ✕
            </button>
          </div>
        ))
      )}

      {/* Campo de nova tarefa */}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          className="flex-1 px-3 py-2 rounded-l-md bg-white border border-gray-300 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 rounded-r-md bg-purple-600 hover:bg-purple-500 text-white transition"
          title="Adicionar"
        >
          <IoIosAdd className="size-5" />
        </button>
      </div>
    </div>
  );
}
