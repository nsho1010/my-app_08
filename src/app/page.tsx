"use client";

import { format } from "date-fns";
import { useGetAllPosts } from "./_hooks/useGetAllPosts";
import Link from "next/link";

const Home: React.FC = () => {
  const { posts, error, isLoading } = useGetAllPosts();

  if (isLoading) return <div>読み込み中...</div>;

  if (error) return <div>{error}</div>;

  if (posts.length === 0) return <div>記事がありません。</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div className="border-2  border-gray-300 w-full max-w-3xl mx-auto p-4 mb-8">
            <div className="flex justify-between">
              <p className="text-gray-500">
                {format(new Date(post.createdAt), "yyyy/MM/dd")}
              </p>
              <div className="flex mr-8">
                {post.categories.map((category, catIndex) => (
                  <div
                    key={catIndex}
                    className="text-blue-600 border-2 border-blue-600 rounded-md py-[0.2rem] px-[0.4rem] mr-2"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-2 mb-4">{post.title}</h2>
              <div
                className="line-clamp-2 text-base"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
