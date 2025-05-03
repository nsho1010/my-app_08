import { GetPostsResponse } from "@/app/_types";
import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAdminPostList = () => {
  const { data, error, isLoading } = useSWR<GetPostsResponse>(
    `${API_URL}/api/admin/posts`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
