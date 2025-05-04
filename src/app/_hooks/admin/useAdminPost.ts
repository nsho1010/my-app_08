import { GetPostsResponse, Post } from "@/app/_types";
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

  // 記事詳細取得GET
  const detailPost = (id: string | number) => {
    return useSWR<{ result: string; post: Post }>(
      `${API_URL}/api/admin/posts/${id}`,
      fetcher
    );
  };

  // 記事新規作成POST
  const createPost = async (postData: {
    title: string;
    content: string;
    thumbnail: string;
    categories: { id: number }[];
  }) => {
    await axios.post(`${API_URL}/api/admin/posts`, postData);
    mutate(); // 登録後に一覧を再取得
  };

  // 記事更新PUT
  const updatePost = async (
    id: string,
    postData: {
      title: string;
      content: string;
      thumbnail: string;
      categories: { id: number }[];
    }
  ) => {
    await axios.put(`${API_URL}/api/admin/posts/${id}`, postData);
    mutate();
  };

  // 記事削除
  const deletePost = async (id: string) => {
    await axios.delete(`${API_URL}/api/admin/posts/${id}`);
    mutate();
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    createPost,
    detailPost,
    updatePost,
    deletePost,
  };
};
