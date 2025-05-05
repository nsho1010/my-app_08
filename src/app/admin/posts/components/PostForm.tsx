"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Category } from "@/app/_types";
import { useEffect } from "react";

export type PostFormData = {
  title: string;
  content: string;
  thumbnail: string;
  category: string;
};

type PostFormProps = {
  initialData?: PostFormData;
  categories?: Category[];
  isLoading?: boolean;
  onSubmit: (data: PostFormData) => Promise<void>;
  submitLabel: string;
  onDelete?: () => void;
  showDeleteButton?: boolean;
};

const PostForm = ({
  initialData,
  categories = [],
  isLoading = false,
  onSubmit,
  submitLabel,
  onDelete,
  showDeleteButton = false,
}: PostFormProps) => {
  // フォームの作成
  const methods = useForm<PostFormData>({
    // デフォルト値は空のオブジェクトか初期データを使用
    defaultValues: initialData || {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  // initialDataが変更されたらフォームをリセット
  useEffect(() => {
    if (initialData) {
      reset(initialData, {
        keepDefaultValues: true, // デフォルト値を保持
      });
    }
  }, [initialData, reset]);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <FormProvider {...methods}>
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
          <input {...register("thumbnail")} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1">カテゴリー</label>
          <select {...register("category")} className="border p-2 w-full">
            <option value="">選択してください</option>
            {categories?.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
            {submitLabel}
          </button>

          {showDeleteButton && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              削除
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PostForm;
