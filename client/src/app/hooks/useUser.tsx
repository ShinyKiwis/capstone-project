"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  name?: string;
  email?: string;
}

export default function useUser() {
  const [user, setUser] = useState<User>({});
  const router = useRouter()

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
    });
  };

  const logout = () => {
    setUser({});
    router.push("/login") 
  };

  return { user, login, logout };
}
