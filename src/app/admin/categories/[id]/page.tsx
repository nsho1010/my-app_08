"use client";

import { useRouter, useParams } from "next/navigation";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { useEffect, useState } from "react";
import CategoryForm, { CategoryFormData } from "../components/CategoryForm";

// 管理者_カテゴリー編集ページ
const AdminCategoryEditPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const [initialData, setInitialData] = useState<CategoryFormData | undefined>(
    undefined
  );

  const { data, updateCategory, deleteCategory, detailCategory } =
    useAdminCategory();

  // detailCategoryを呼び出してカテゴリー詳細を取得する
  const { data: detailData, isLoading: isDetailLoading } =
    detailCategory(categoryId);

  // カテゴリーデータ取得後にフォームへセット
  useEffect(() => {
    if (!detailData) return;
    if (!detailData.category) return;
    setInitialData({
      name: detailData.category.name,
    });
  }, [detailData]);

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
      router.replace("/admin/categories");
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">カテゴリー編集</h1>

        <CategoryForm
          initialData={initialData}
          isLoading={isDetailLoading}
          onSubmit={onSubmit}
          submitLabel="更新"
          onDelete={handleDelete}
          showDeleteButton={true}
        />
      </main>
    </div>
  );
};

export default AdminCategoryEditPage;
