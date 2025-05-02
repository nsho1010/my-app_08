import { PrismaClient } from "@/generated/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 引数でリクエストを受け取る
export const GET = async (req: NextApiRequest) => {
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
