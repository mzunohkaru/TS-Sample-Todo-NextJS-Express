"use client";

import { useRef } from "react";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";

import { API_URL } from "../constants/url";
import Todo from "./components/Todo";
import { TodoType, InsertTodoType } from "./model/Todo";

async function getFetcher(key: string) {
  const res: AxiosResponse<TodoType[], null> = await axios.get(key);
  return res.data;
}

async function postFetcher(
  key: string,
  data: InsertTodoType
): Promise<AxiosResponse<TodoType, InsertTodoType>> {
  const res: AxiosResponse<TodoType, InsertTodoType> = await axios.post(
    key,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: todos, mutate } = useSWR(`${API_URL}`, getFetcher);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    const response: AxiosResponse<TodoType, InsertTodoType> = await postFetcher(
      `${API_URL}`,
      {
        title: inputRef.current.value,
      }
    );

    if (response.status === 201) {
      mutate([...(todos || []), response.data]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          Todo List
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
        {todos ? (
          todos.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}
