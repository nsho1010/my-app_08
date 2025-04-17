import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../_constants";
import { Post } from "../_types";

export const useGetAllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts`, {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        setPosts(res.data.contents);
      } catch (err) {
        setError("記事一覧の取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, error, isLoading };
};
