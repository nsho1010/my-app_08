"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li>
            <Link
              href="/admin/posts"
              className={`block mb-2 ${
                pathname === "/admin/posts"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              記事一覧
            </Link>
          </li>
          <li>
            <Link
              href="/admin/categories"
              className={`block mb-2 ${
                pathname === "/admin/categories"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              カテゴリー一覧
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
