import { Category } from "./../../../../generated/prisma/index.d";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type CreateCategory = {
  name: string;
};

// 管理者＿カテゴリ作成API
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

// 管理者＿カテゴリ一覧取得API
export const GET = async (req: NextRequest) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { result: "OK", categories: categories },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ result: error.message }, { status: 400 });
  }
};
