"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useNavigate from "../hooks/useNavigate";

interface AuthContextType {
  error: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  handleUserEnrollProject: (projectId: number) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    const syncUser = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_SYNC_USER_URL!, {
        withCredentials: true,
      });
      // console.log('Res:', response)
      const { user } = response.data;
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("User synced")
      }
    };
    if (user) {
      syncUser();
    }
  }, []);

  const login = async (username: string, password: string) => {
    let response = null;
    try {
      response = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_URL!,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      setError("Service error: "+error)
    }

    // console.log(response);
    const { authenticated, user } = response?.data;
    if (authenticated) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setError("");
      navigate("/project?project=specialized");
    } else {
      setError("Invalid username or password!");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const handleUserEnrollProject = (projectId: number) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      project: {
        code: projectId,
      },
    };

    sessionStorage.setItem(
      "user",
      JSON.stringify(updatedUser),
    );
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ error, login, logout, user, setUser, handleUserEnrollProject }}>
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
};

export default AuthProvider;
