"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const { session, isLoding } = useSupabaseSession();

  return (
    <header className="w-full">
      <div className="flex justify-between items-center bg-gray-800 text-white  px-8 py-6">
        <Link href="/">
          <h1 className="font-bold text-xl">Blog</h1>
        </Link>
        {!isLoding && (
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/admin" className="header-link">
                  管理画面
                </Link>
                <button onClick={handleLogout}>ログアウト</button>
              </>
            ) : (
              <>
                <Link href="/contact" className="header-link">
                  お問い合わせ
                </Link>
                <Link href="/login" className="header-link">
                  ログイン
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
