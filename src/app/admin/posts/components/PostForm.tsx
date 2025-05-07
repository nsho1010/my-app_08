"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Category } from "@/app/_types";
import { useEffect, useState } from "react";
import { useAdminPost } from "@/app/_hooks/admin/useAdminPost";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

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
  const methods = useForm<PostFormData>({
    defaultValues: initialData || {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
    },
  });

  const { uploadThumbnail } = useAdminPost();
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    try {
      const file = event.target.files[0];
      const thumbnailPath = await uploadThumbnail(file);
      methods.setValue("thumbnail", thumbnailPath);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const thumbnailKey = methods.watch("thumbnail");
    if (!thumbnailKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post-thumbnail")
        .getPublicUrl(thumbnailKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [methods.watch("thumbnail")]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData, {
        keepDefaultValues: true,
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
          <label className="block mb-1">サムネイル画像</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
          {methods.watch("thumbnail") && (
            <p className="text-sm text-gray-500">
              アップロード済み: {methods.watch("thumbnail")}
            </p>
          )}
          {thumbnailImageUrl && (
            <div className="mt-2">
              <Image
                src={thumbnailImageUrl}
                alt="thumbnail"
                width={400}
                height={400}
                unoptimized={true}
              />
            </div>
            // <div className="mt-2">
            //   <img
            //     src={thumbnailImageUrl}
            //     alt="thumbnail"
            //     style={{ width: "400px", height: "400px", objectFit: "cover" }}
            //   />
            // </div>
          )}
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
