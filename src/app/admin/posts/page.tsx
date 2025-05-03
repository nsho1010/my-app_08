"use client";

import { useAdminPostList } from "@/app/_hooks/admin/useAdminPostList";
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/app/_types";

const AdminPostsPage = () => {
  const { data, isLoading, error } = useAdminPostList();

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

      {/* 状態別の表示 */}
      {isLoading && <div>読み込み中...</div>}
      {error && <div>エラーが発生しました。</div>}
      {!data && <div>投稿データがありません。</div>}
      {data?.posts?.length === 0 && <div>記事がありません。</div>}

      <div>
        {data?.posts?.map((post: Post) => (
          <div key={post.id} className="border-b py-4">
            <p className="text-lg font-bold">{post.title}</p>
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
