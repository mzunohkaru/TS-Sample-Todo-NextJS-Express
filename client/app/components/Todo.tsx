import React, { useState } from "react";
import axios from "axios";
import { TodoType } from "../model/Todo";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";

type TodoProps = {
  todo: TodoType;
  handleEditTitle: (id: number, title: string) => void;
  handleEditCompleted: (id: number, isCompleted: boolean) => void;
  handleDelete: (id: number) => void;
};

export const Todo = ({ todo, handleEditTitle, handleEditCompleted, handleDelete}: TodoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  async function handleEdit() {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleEditTitle(todo.id, editedTitle);
    }
  }

  async function toggleTodoCompletion(isCompleted: boolean) {
    handleEditCompleted(todo.id, !isCompleted);
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
              className="bg-red-500 hover:bg-red-6000 text-white font-medium py-1 px-2 rounded"
            >
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};