import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export const useSupabaseSession = () => {
  // undefind: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoding(false);
    };

    fetcher();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoding(false);
    });

    // クリーンアップ関数
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, isLoding, token };
};
