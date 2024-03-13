"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  error: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | null;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = async (username: string, password: string) => {
      setError("Invalid username or password!");
    // const response = await axios.post(process.env.AUTH_URL!, {
    //   username,
    //   password,
    // });
    // const { authenticated, user } = response.data;
    // if (authenticated) {
    //   sessionStorage.setItem("user", JSON.stringify(user));
    //   setUser(user);
    //   setError("");
    // } else {
    //   setError("Invalid username or password!");
    // }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ error, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useRoles must be used inside the RolesProvider");
  }

  return context;
}

export default AuthProvider;
