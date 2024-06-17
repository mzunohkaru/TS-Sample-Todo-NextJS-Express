"use client";

import { Todo } from "./components/Todo";
import axios, { AxiosResponse } from "axios";
import { useRef } from "react";
import { TodoType, InsertTodoType } from "./model/Todo";
import { useTodos } from "./hooks/useTodos";
import { API_URL } from "@/constants/url";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todosData, mutate, createTodo, updateTodoTitle, updateTodoCompleted, deleteTodo } =
    useTodos();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    await createTodo(inputRef.current.value);

    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  }

  async function handleEditTitle(id: number, title: string) {
    await updateTodoTitle(id, title);
  }

  async function handleEditCompleted(id: number, isCompleted: boolean) {
    await updateTodoCompleted(id, isCompleted);
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent
        border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
        focus:outline-none"
            type="text"
            placeholder="Add a task"
            ref={inputRef}
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todosData
          ?.slice()
          .sort((a: TodoType, b: TodoType) => a.id - b.id)
          .map((todo: TodoType) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleEditTitle={handleEditTitle}
              handleEditCompleted={handleEditCompleted}
              handleDelete={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
}
