import { API_URL } from "@/constants/url";
import useSWR from "swr";
import axios from "axios";

async function getFetcher(key: string) {
  const response = await axios.get(key);
  return response.data;
}

export const useTodos = () => {
  const { data, isLoading, error, mutate } = useSWR(`${API_URL}`, getFetcher);

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
