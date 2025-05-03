"use client";

import { format } from "date-fns";
import { useGetAllPosts } from "./_hooks/useGetAllPosts";
import Link from "next/link";

const Home: React.FC = () => {
  const { data, error, isLoading } = useGetAllPosts();

  if (isLoading) return <div>読み込み中...</div>;

  if (error) return <div>エラーが発生しました。</div>;

  if (!data) return <div>投稿データがありません。</div>;

  if (data.posts.length === 0) return <div>記事がありません。</div>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-50">
      {data.posts.map((post, index) => (
        <Link
          key={index}
          href={`/posts/${post.id}`}
          className="w-full max-w-3xl mb-6"
        >
          <div className="border border-gray-300 bg-white p-6 rounded-md shadow-sm hover:shadow transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), "yyyy/M/d")}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.postCategories.map((postCategory, catIndex) => (
                  <span
                    key={catIndex}
                    className="text-sm text-blue-600 border border-blue-600 rounded-md px-2 py-0.5"
                  >
                    {postCategory.category.name}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">{post.title}</h2>

            <div
              className="text-base text-gray-700 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
