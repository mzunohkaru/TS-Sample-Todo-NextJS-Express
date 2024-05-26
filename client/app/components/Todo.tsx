import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { TodoType, UpdateTodoType } from "../model/Todo";
// import { API_URL } from "../../constants/url";

const API_URL = "http://localhost:8080/todo";

type TodoProps = {
  todo: TodoType;
};

async function putFetcher(
  key: string,
  data: UpdateTodoType
): Promise<AxiosResponse<TodoType, TodoType>> {
  const res: AxiosResponse<TodoType, TodoType> = await axios.put(key, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

export default function Todo({ todo }: TodoProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>(todo.title);

  // Wip...
  async function updateTodo() {
    const response: AxiosResponse<UpdateTodoType, UpdateTodoType> =
      await putFetcher(`${API_URL}/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      });
    if (response.status === 204) {
      console.log(response.status);
      router.refresh();
    }
  }

  async function handleEdit() {
    setIsEditing(!isEditing);
    if (isEditing) {
      // 編集完了時の処理を追加
    }
  }

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id={`todo-${todo.id}`}
              name={`todo-${todo.id}`}
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => updateTodo()}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="border-2 border-gray-300 rounded w-20"
                />
              ) : (
                <span
                  className={`text-lg font-medium mr-2 ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            >
              {isEditing ? "Save" : "✒"}
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded">
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  );
}
