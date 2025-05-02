import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type CreateCategory = {
  name: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: CreateCategory = await req.json();

    // categoryテーブルにインサート
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { message: "投稿が作成されました", data: newCategory },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "カテゴリの作成中にエラーが発生しました",
      },
      {
        status: 500,
      }
    );
  }
};
