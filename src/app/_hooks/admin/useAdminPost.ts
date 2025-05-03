import { GetPostsResponse } from "@/app/_types";
import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAdminPost = () => {
  // 記事一覧取得GET
  const { data, error, isLoading, mutate } = useSWR<GetPostsResponse>(
    `${API_URL}/api/admin/posts`,
    fetcher
  );

  // 記事新規作成POST
  const createPost = async (postData: {
    title: string;
    content: string;
    thumbnail: string;
    categories: number;
  }) => {
    await axios.post(`${API_URL}/api/admin/posts`, postData);
    mutate(); // 登録後に一覧を再取得
  };

  return {
    data,
    error,
    isLoading,
    createPost,
  };
};
