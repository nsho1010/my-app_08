import { GetPostsResponse, Post } from "@/app/_types";
import useSWR from "swr";
import { useSupabaseSession } from "../useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/app/_lib/api";

const fetcher = async <T>(url: string, token: string): Promise<T> => {
  return api.get<T>(url, token);
};

export const useAdminPost = () => {
  const { token } = useSupabaseSession();

  // 記事一覧取得GET
  const { data, error, isLoading, mutate } = useSWR<GetPostsResponse>(
    token ? ["/api/admin/posts", token] : null,
    token
      ? ([url, token]: [string, string]) =>
          fetcher<GetPostsResponse>(url, token)
      : null
  );

  // 記事詳細取得GET
  const detailPost = (id: string | number) => {
    return useSWR<{ result: string; post: Post }>(
      token ? [`/api/admin/posts/${id}`, token] : null,
      token
        ? ([url, token]: [string, string]) =>
            fetcher<{ result: string; post: Post }>(url, token)
        : null
    );
  };

  // 画像アップロード
  const uploadThumbnail = async (file: File): Promise<string> => {
    const filePath = `private/${uuidv4()}`;
    const { data, error } = await supabase.storage
      .from("post-thumbnail")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data.path;
  };

  // 記事作成POST
  const createPost = async (postData: {
    title: string;
    content: string;
    thumbnail: string;
    categories: { id: number }[];
  }) => {
    if (!token) return;
    await api.post(
      "/api/admin/posts",
      {
        ...postData,
        thumbnailImageKey: postData.thumbnail,
      },
      token
    );
    mutate();
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
    if (!token) return;
    await api.put(`/api/admin/posts/${id}`, postData, token);
    mutate();
  };

  // 記事削除
  const deletePost = async (id: string) => {
    if (!token) return;
    await api.delete(`/api/admin/posts/${id}`, token);
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
    uploadThumbnail,
  };
};
