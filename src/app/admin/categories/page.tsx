"use client";

import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import Link from "next/link";
import { format } from "date-fns";
import { Category, Post } from "@/app/_types";

const AdminCategoriesPage = () => {
  const { data, isLoading, error } = useAdminCategory();

  // 読み込み中
  if (isLoading) return <div>読み込み中...</div>;

  // エラー
  if (error) return <div>エラーが発生しました。</div>;

  // データなし
  if (!data) return <div>投稿データがありません。</div>;

  // 記事0件
  if (data.categories.length === 0) return <div>カテゴリーがありません。</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">カテゴリー一覧</h1>
        <Link
          href="/admin/categories/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          新規作成
        </Link>
      </div>

      <div>
        {data.categories.map((category: Category) => (
          <div key={category.id} className="border-b py-4">
            <Link
              href={`/admin/categories/${category.id}`}
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
            <p className="text-sm text-gray-500">
              {format(new Date(category.createdAt), "yyyy/M/d")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminCategoriesPage;
