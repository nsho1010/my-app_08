"use client";

import { useAdminPostList } from "@/app/_hooks/admin/useAdminPostList";
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/app/_types";

const AdminPostsPage = () => {
  const { data, isLoading, error } = useAdminPostList();

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラーが発生しました。</div>;
  if (!data) return <div>投稿データがありません。</div>;
  if (data.posts.length === 0) return <div>記事がありません。</div>;

  return (
    <div className="flex min-h-screen">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li className="mb-2 font-bold text-blue-600">記事一覧</li>
          <li className="mb-2 text-gray-600">カテゴリー一覧</li>
        </ul>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-8">
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
              <p className="text-lg font-bold">{post.title}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), "yyyy/M/d")}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPostsPage;
