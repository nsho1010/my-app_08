import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type CreatePost = {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnail: string;
};

export const POST = async (req: NextRequest) => {
  try {
    // リクエストをbodyに入れる
    const body: CreatePost = await req.json();

    // Postテーブルにインサート
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        thumbnailUrl: body.thumbnail,
      },
    });

    // PostCategory（中間テーブル）にインサート
    const postCategoryCreates = body.categories.map((category) => {
      return prisma.postCategory.create({
        data: {
          postId: newPost.id,
          categoryId: category.id,
        },
      });
    });

    await Promise.all(postCategoryCreates);

    return NextResponse.json(
      { message: "投稿が作成されました", data: newPost },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "投稿作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
};
