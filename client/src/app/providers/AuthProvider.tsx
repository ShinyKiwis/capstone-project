"use client";
import React, { createContext, useState } from "react";
import useNavigate from "../hooks/useNavigate";

interface AuthContextProps {
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  setUser: any
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const navigate = useNavigate();

  const login = (user: User) => {
    console.log("Login");
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/project?project=specialized");
  };

  const logout = () => {
    console.log("Logout");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const authContextValue: AuthContextProps = {
    login,
    logout,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
