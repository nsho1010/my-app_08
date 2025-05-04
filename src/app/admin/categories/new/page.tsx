"use client";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import { Category } from "@/app/_types";
import { useForm } from "react-hook-form";

type CategoryFormData = {
  name: string;
};

const AdminPostNewPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CategoryFormData>();

  const { data, isLoading, error, createCategory } = useAdminCategory();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory({
        name: data.name,
      });

      alert("カテゴリーが新規作成されました。");
      reset();
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

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
            >
              作成
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminPostNewPage;
