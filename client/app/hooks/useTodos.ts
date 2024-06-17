import useSWR from "swr";
import axios from "axios";
import { API_URL } from "@/constants/url";
import { InsertTodoType } from "@/app/model/Todo";

async function postFetcher(key: string, data: InsertTodoType) {
  const response = await axios.post(key, data);
  return response;
}

async function getFetcher(key: string) {
  const response = await axios.get(key);
  return response.data;
}

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

export const useTodos = () => {
  const { data: todosData, isLoading, error, mutate } = useSWR(`${API_URL}`, getFetcher);

  async function createTodo(title: string) {
    const response = await postFetcher(`${API_URL}`, {
      title: title,
      isCompleted: false,
    });
    mutate();
  }

  async function updateTodoTitle(id: number, title: string) {
    await putFetcher(`${API_URL}/${id}`, {
      title: title,
    });
    mutate();
  }

  async function updateTodoCompleted(id: number, isCompleted: boolean) {
    await putFetcher(`${API_URL}/${id}`, {
      isCompleted: isCompleted,
    });
    mutate();
  }

  async function deleteTodo(id: number) {
    await deleteFetcher(`${API_URL}/${id}`);
    mutate();
  }

  return {
    todosData,
    isLoading,
    error,
    mutate,
    createTodo,
    updateTodoTitle,
    updateTodoCompleted,
    deleteTodo,
  };
};
