import { PrismaClient } from "@/generated/prisma";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type CreatePost = {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnail: string;
};

// 記事投稿API
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

// 管理者＿記事一覧取得API
export const GET = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);

  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 }); // tokenが正しい場合、以降が実行される

  try {
    // DBから紐づけられているcategoryテーブルから全てのカラム全件取得
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
      // 降順（新しい順）
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ result: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ result: error.message }, { status: 400 });
  }
};
