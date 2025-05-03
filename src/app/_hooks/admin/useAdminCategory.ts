import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAdminCategory = () => {
  // カテゴリ一覧取得GET
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/admin/categories`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
