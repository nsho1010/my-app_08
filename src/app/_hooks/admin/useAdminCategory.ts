import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAdminCategory = () => {
  // カテゴリ一覧取得GET
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/api/admin/categories`,
    fetcher
  );

  // カテゴリー新規作成POST
  const createCategory = async (categoryData: { name: string }) => {
    await axios.post(`${API_URL}/api/admin/categories`, categoryData);
    mutate(); // 登録後に一覧を再取得
  };

  return {
    data,
    error,
    isLoading,
    createCategory,
  };
};
