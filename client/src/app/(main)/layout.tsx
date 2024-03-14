"use client"
import { useEffect } from "react";
import App from "../_components/App";
import DeadlinesProvider from "../providers/DeadlinesProvider";
import RolesProvider from "../providers/RolesProvider";
import { useAuth } from "../providers/AuthProvider";
import useNavigate from "../hooks/useNavigate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, []);
  return (
    <DeadlinesProvider>
      <RolesProvider>
        <App>{children}</App>
      </RolesProvider>
    </DeadlinesProvider>
  );
}
