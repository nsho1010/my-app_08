import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useGetPost = (id: string) => {
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/posts/${id}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
