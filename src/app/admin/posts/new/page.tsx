"use client";
import { useAdminCategory } from "@/app/_hooks/admin/useAdminCategory";
import { Category } from "@/app/_types";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
  thumbnailUrl: string;
  category: string;
};

const AdminPostNewPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const { data, isLoading, error } = useAdminCategory();

  if (isLoading) return <p>読み込み中...</p>;
  if (error)
    return <p className="text-red-500">カテゴリーの取得に失敗しました。</p>;
  if (!data) return <p>カテゴリー情報がありません。</p>;

  const onSubmit = async (data: FormData) => {
    try {
      // ここはAPIにPOSTする
      console.log("送信データ:", data);
      alert("記事を作成しました！");
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
        <h1 className="text-2xl font-bold mb-6">記事作成</h1>

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
              {data?.categories?.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
