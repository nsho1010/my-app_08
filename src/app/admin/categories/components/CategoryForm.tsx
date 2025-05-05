"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";

export type CategoryFormData = {
  name: string;
};

type CategoryFormProps = {
  initialData?: CategoryFormData;
  isLoading?: boolean;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  submitLabel: string;
  onDelete?: () => void;
  showDeleteButton?: boolean;
};

const CategoryForm = ({
  initialData,
  isLoading = false,
  onSubmit,
  submitLabel,
  onDelete,
  showDeleteButton = false,
}: CategoryFormProps) => {
  // フォームの作成
  const methods = useForm<CategoryFormData>({
    // デフォルト値は空のオブジェクトか初期データを使用
    defaultValues: initialData || {
      name: "",
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
          <label className="block mb-1">カテゴリー名</label>
          <input
            {...register("name", { required: "カテゴリー名は必須です" })}
            className="border p-2 w-full"
            disabled={isLoading}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitLabel}
          </button>

          {showDeleteButton && onDelete && (
            <button
              type="button"
              disabled={isLoading}
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

export default CategoryForm;
