"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

// 앱 전체에서 로그인 상태를 공유하기 위한 Context
const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

// 전체 레이아웃을 감싸 로그인 상태를 실시간으로 전달하는 Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 처음 마운트될 때 현재 로그인된 사용자 정보를 확인합니다.
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    // 로그인·로그아웃·회원가입 등 인증 상태가 바뀔 때마다 즉시 반영합니다.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 다른 컴포넌트에서 현재 로그인 사용자(user)와 확인 중 여부(loading)를 쉽게 꺼내 쓰는 훅
export function useAuth() {
  return useContext(AuthContext);
}
