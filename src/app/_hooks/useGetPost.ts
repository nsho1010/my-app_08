import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../_constants";
import { Post } from "../_types";

export const useGetPost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/${id}`);
        setPost(res.data.post);
      } catch (err) {
        setError("記事の取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return { post, error, isLoading };
};
