"use client";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import PostForm, { PostFormData } from "../components/PostForm";

const AdminPostNewPage = () => {
  const { data: categoryData, isLoading, error } = useAdminCategory();
  const { createPost } = useAdminPost();

  if (error)
    return <p className="text-red-500">カテゴリーの取得に失敗しました。</p>;
  if (!categoryData && !isLoading) return <p>カテゴリー情報がありません。</p>;

  const onSubmit = async (data: PostFormData) => {
    try {
      await createPost({
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
        categories: [{ id: Number(data.category) }],
      });

      alert("記事が新規作成されました。");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* メインコンテンツ */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">記事作成</h1>

        <PostForm
          categories={categoryData?.categories}
          isLoading={isLoading}
          onSubmit={onSubmit}
          submitLabel="作成"
        />
      </main>
    </div>
  );
};

export default AdminPostNewPage;
