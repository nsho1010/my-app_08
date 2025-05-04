"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import { Category } from "@/app/_types";
import { useEffect } from "react";

type FormData = {
  title: string;
  content: string;
  thumbnailUrl: string;
  category: string;
};

// 管理者_記事編集ページ
const AdminPostEditPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = params.id;

  const { data: categoryData, isLoading: isCategoryLoading } =
    useAdminCategory();
  const { data, updatePost, deletePost, detailPost } = useAdminPost();

  // detailPostを呼び出して記事詳細を取得する
  const { data: detailData, isLoading: isDetailLoading } = detailPost(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  // 記事データ取得後にフォームへセット
  useEffect(() => {
    if (!detailData) return;
    if (!detailData.post) return;
    reset({
      title: detailData.post.title,
      content: detailData.post.content,
      thumbnailUrl: detailData.post.thumbnailUrl,
      category: String(detailData.post.postCategories?.[0]?.id ?? ""),
    });
  }, [detailData, reset]);

  if (isCategoryLoading || isDetailLoading) return <p>読み込み中...</p>;

  const onSubmit = async (data: FormData) => {
    await updatePost(postId, {
      title: data.title,
      content: data.content,
      thumbnail: data.thumbnailUrl,
      categories: [{ id: Number(data.category) }],
    });
    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      await deletePost(postId);
      alert("記事を削除しました");
      router.push("/admin/posts");
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">記事編集</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1">タイトル</label>
            <input
              {...register("title", { required: "タイトルは必須です" })}
              className="border p-2 w-full"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">内容</label>
            <textarea
              {...register("content")}
              className="border p-2 w-full h-32"
            />
          </div>

          <div>
            <label className="block mb-1">サムネイルURL</label>
            <input
              {...register("thumbnailUrl")}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1">カテゴリー</label>
            <select {...register("category")} className="border p-2 w-full">
              <option value="">選択してください</option>
              {categoryData?.categories?.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
