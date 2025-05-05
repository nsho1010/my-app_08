import axios from "axios";
import { GetPostsResponse } from "../_types";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useGetAllPosts = () => {
  const { data, error, isLoading } = useSWR<GetPostsResponse>(
    `${API_URL}/api/posts`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
