import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Result } from "postcss";

const prisma = new PrismaClient();

type UpdateCategory = {
  name: string;
};

// 管理者_カテゴリー詳細取得API
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { result: "OK", category: category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ result: error.message }, { status: 400 });
  }
};

// 管理者_カテゴリー更新API
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const { name }: UpdateCategory = await req.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { result: "OK", category: category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ result: error.message }, { status: 400 });
  }
};

// 管理者_カテゴリー削除API
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ result: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ result: error.message }, { status: 400 });
  }
};
