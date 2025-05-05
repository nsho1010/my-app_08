import { Category, GetCategoryResponse } from "@/app/_types";
import axios from "axios";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAdminCategory = () => {
  // カテゴリ一覧取得GET
  const { data, error, isLoading, mutate } = useSWR<GetCategoryResponse>(
    `${API_URL}/api/admin/categories`,
    fetcher
  );

  // 記事詳細取得GET
  const detailCategory = (id: string | number) => {
    return useSWR<{ result: string; category: Category }>(
      `${API_URL}/api/admin/categories/${id}`,
      fetcher
    );
  };

  // カテゴリー新規作成POST
  const createCategory = async (categoryData: { name: string }) => {
    await axios.post(`${API_URL}/api/admin/categories`, categoryData);
    mutate(); // 登録後に一覧を再取得
  };

  // カテゴリー更新PUT
  const updateCategory = async (
    id: string,
    categoryData: {
      name: string;
    }
  ) => {
    await axios.put(`${API_URL}/api/admin/categories/${id}`, categoryData);
    mutate();
  };

  // カテゴリー削除
  const deleteCategory = async (id: string) => {
    await axios.delete(`${API_URL}/api/admin/categories/${id}`);
    mutate();
  };

  return {
    data,
    error,
    isLoading,
    createCategory,
    detailCategory,
    updateCategory,
    deleteCategory,
  };
};
