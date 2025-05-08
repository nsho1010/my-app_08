import { Category, GetCategoryResponse } from "@/app/_types";
import useSWR from "swr";
import { useSupabaseSession } from "../useSupabaseSession";
import { api } from "@/app/_lib/api";

const fetcher = async <T>(url: string, token: string): Promise<T> => {
  return api.get<T>(url, token);
};

export const useAdminCategory = () => {
  const { token } = useSupabaseSession();

  // カテゴリ一覧取得GET
  const { data, error, isLoading, mutate } = useSWR<GetCategoryResponse>(
    token ? ["/api/admin/categories", token] : null,
    token
      ? ([url, token]: [string, string]) =>
          fetcher<GetCategoryResponse>(url, token)
      : null
  );

  // 記事詳細取得GET
  const detailCategory = (id: string | number) => {
    return useSWR<{ result: string; category: Category }>(
      token ? [`/api/admin/categories/${id}`, token] : null,
      token
        ? ([url, token]: [string, string]) =>
            fetcher<{ result: string; category: Category }>(url, token)
        : null
    );
  };

  // カテゴリー新規作成POST
  const createCategory = async (categoryData: { name: string }) => {
    if (!token) return;
    await api.post("/api/admin/categories", categoryData, token);
    mutate();
  };

  // カテゴリー更新PUT
  const updateCategory = async (
    id: string,
    categoryData: {
      name: string;
    }
  ) => {
    if (!token) return;
    await api.put(`/api/admin/categories/${id}`, categoryData, token);
    mutate();
  };

  // カテゴリー削除
  const deleteCategory = async (id: string) => {
    if (!token) return;
    await api.delete(`/api/admin/categories/${id}`, token);
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
