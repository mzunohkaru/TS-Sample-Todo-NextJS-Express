import React, { useState } from "react";
import axios from "axios";
import { TodoType } from "../model/Todo";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";

type TodoProps = {
  todo: TodoType;
};

async function putFetcher(key: string, body: any) {
  const response = await axios.put(key, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function deleteFetcher(key: string) {
  const response = await axios.delete(key, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, isLoading, error, mutate } = useTodos();

  async function handleEdit() {
    setIsEditing(!isEditing);
    if (isEditing) {
      const response = await putFetcher(`${API_URL}/${todo.id}`, {
        title: editedTitle,
      });

      if (response.status === 201) {
        const editedTodo = response.data;
        const updatedTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(updatedTodos);
      }
    }
  }

  async function handleDelete(id: number) {
    const response = await deleteFetcher(`${API_URL}/${todo.id}`);

    if (response.status === 201) {
      const updatedTodos = todos.filter((todo: TodoType) => todo.id !== id);
      mutate(updatedTodos);
    }
  }

  async function toggleTodoCompletion(isCompleted: boolean) {
    const response = await putFetcher(`${API_URL}/${todo.id}`, {
      isCompleted: !isCompleted,
    });

    if (response.status === 201) {
      try {
        const editedTodo = response.data;
        const updatedTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(updatedTodos);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.error("Failed to fetch or invalid content type");
    }
  }

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodoCompletion(todo.isCompleted)}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
            border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  className="border rounded py-1 px-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
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
          <div className={`flex items-center space-x-2 `}>
            <button
              onClick={handleEdit}
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            >
              {isEditing ? "Save" : "✒"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            >
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Todo;
