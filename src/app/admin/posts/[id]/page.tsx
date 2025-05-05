"use client";

import { useRouter, useParams } from "next/navigation";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import { useEffect, useState } from "react";
import PostForm, { PostFormData } from "../components/PostForm";

// 管理者_記事編集ページ
const AdminPostEditPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = params.id;
  const [initialData, setInitialData] = useState<PostFormData | undefined>(
    undefined
  );

  const { data: categoryData, isLoading: isCategoryLoading } =
    useAdminCategory();
  const { data, updatePost, deletePost, detailPost } = useAdminPost();

  // detailPostを呼び出して記事詳細を取得する
  const { data: detailData, isLoading: isDetailLoading } = detailPost(postId);

  // 記事データ取得後にフォームへセット
  useEffect(() => {
    if (!detailData) return;
    if (!detailData.post) return;

    setInitialData({
      title: detailData.post.title,
      content: detailData.post.content,
      thumbnail: detailData.post.thumbnailUrl,
      category: String(detailData.post.postCategories?.[0]?.id ?? ""),
    });
  }, [detailData]);

  const onSubmit = async (data: PostFormData) => {
    await updatePost(postId, {
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnail,
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

        <PostForm
          initialData={initialData}
          categories={categoryData?.categories}
          isLoading={isCategoryLoading || isDetailLoading}
          onSubmit={onSubmit}
          submitLabel="更新"
          onDelete={handleDelete}
          showDeleteButton={true}
        />
      </main>
    </div>
  );
};

export default AdminPostEditPage;
