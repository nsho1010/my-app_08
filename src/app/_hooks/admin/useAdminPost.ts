import { GetPostsResponse, Post } from "@/app/_types";
import axios from "axios";
import useSWR from "swr";
import { useSupabaseSession } from "../useSupabaseSession";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async (url: string, token: string) => {
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.data;
};

export const useAdminPost = () => {
  const { token } = useSupabaseSession();

  // 記事一覧取得GET
  const { data, error, isLoading, mutate } = useSWR<GetPostsResponse>(
    token ? [`${API_URL}/api/admin/posts`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token)
  );

  // 記事詳細取得GET
  const detailPost = (id: string | number) => {
    return useSWR<{ result: string; post: Post }>(
      token ? [`${API_URL}/api/admin/posts/${id}`, token] : null,
      ([url, token]: [string, string]) => fetcher(url, token)
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

  // 記事新規作成POST
  const createPost = async (postData: {
    title: string;
    content: string;
    thumbnail: string;
    categories: { id: number }[];
  }) => {
    await axios.post(
      `${API_URL}/api/admin/posts`,
      {
        ...postData,
        thumbnailImageKey: postData.thumbnail,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    mutate();
  };

  // 記事更新PUT
  const updatePost = async (
    id: string,
    postData: {
      title: string;
      content: string;
      thumbnailImageKey: string;
      categories: { id: number }[];
    }
  ) => {
    await axios.put(`${API_URL}/api/admin/posts/${id}`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    mutate();
  };

  // 記事削除
  const deletePost = async (id: string) => {
    await axios.delete(`${API_URL}/api/admin/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
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
