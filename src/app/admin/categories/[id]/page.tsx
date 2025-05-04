"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { Category } from "@/app/_types";
import { useEffect } from "react";

type CategoryFormData = {
  name: string;
};

// 管理者_カテゴリー編集ページ
const AdminPostEditPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const categoryId = params.id;

  const { data, updateCategory, deleteCategory, detailCategory } =
    useAdminCategory();

  // detailCategoryを呼び出してカテゴリー詳細を取得する
  const { data: detailData, isLoading: isDetailLoading } =
    detailCategory(categoryId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CategoryFormData>();

  // カテゴリーデータ取得後にフォームへセット
  useEffect(() => {
    if (!detailData) return;
    if (!detailData.category) return;
    reset({
      name: detailData.category.name,
    });
  }, [detailData, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    await updateCategory(categoryId, {
      name: data.name,
    });
    alert("カテゴリーを更新しました");
    router.push("/admin/categories");
  };

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      await deleteCategory(categoryId);
      alert("カテゴリーを削除しました");
      router.push("/admin/categories");
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">カテゴリー編集</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1">カテゴリー名</label>
            <input
              {...register("name", { required: "カテゴリー名は必須です" })}
              className="border p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              更新
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              削除
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminPostEditPage;
