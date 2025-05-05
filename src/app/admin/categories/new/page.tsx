"use client";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import CategoryForm, { CategoryFormData } from "../components/CategoryForm";
import { useRouter } from "next/navigation";

const AdminCategoryNewPage = () => {
  const router = useRouter();
  const { data, isLoading, error, createCategory } = useAdminCategory();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory({
        name: data.name,
      });

      alert("カテゴリーが新規作成されました。");
      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* メインコンテンツ */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">カテゴリー作成</h1>

        <CategoryForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          submitLabel="作成"
        />
      </main>
    </div>
  );
};

export default AdminCategoryNewPage;
