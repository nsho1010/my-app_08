"use client";

import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/app/_types";

const AdminPostsPage = () => {
  const { data, isLoading, error } = useAdminPost();

  // 読み込み中
  if (isLoading) return <div>読み込み中...</div>;

  // エラー
  if (error) return <div>エラーが発生しました。</div>;

  // データなし
  if (!data) return <div>投稿データがありません。</div>;

  // 記事0件
  if (data.posts.length === 0) return <div>記事がありません。</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">記事一覧</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          新規作成
        </Link>
      </div>

      <div>
        {data.posts.map((post: Post) => (
          <div key={post.id} className="border-b py-4">
            <Link
              href={`/admin/posts/${post.id}`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">
              {format(new Date(post.createdAt), "yyyy/M/d")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPostsPage;
