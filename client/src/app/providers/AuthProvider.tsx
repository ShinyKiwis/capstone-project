"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import useNavigate from "../hooks/useNavigate";

interface AuthContextProps {
  login: (user: User) => void;
  logout: () => void;
  enroll: (code: number) => void;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: [{
    id:string,
    name:string
  }];
  project?: {
    code: number,
  }
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

  const enroll = (code: number) => {
    console.log("Enroll");
    let storedUser = sessionStorage.getItem("user");
    if(!storedUser) return null;
    let user = JSON.parse(storedUser);
    let enrolledProject = user?.project;
    if(enrolledProject) user.project.code = code;
    else { 
      user.project = {
        code
      }
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const authContextValue: AuthContextProps = {
    login,
    logout,
    user,
    enroll
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
