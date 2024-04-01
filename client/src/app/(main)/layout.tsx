"use client";
import { useEffect } from "react";
import App from "../_components/App";
import DeadlinesProvider from "../providers/DeadlinesProvider";
import RolesProvider from "../providers/RolesProvider";
import { useAuth } from "../providers/AuthProvider";
import useNavigate from "../hooks/useNavigate";
import { ProjectProvider } from "../providers/ProjectProvider";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname, useSearchParams } from "next/navigation";
import isValid from "../lib/isValid";
import BreadCrumbProvider from "../providers/BreadCrumbProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("new query client");
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  console.log("ROOTLAYOUT: ", user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // if (!isValid(pathname, searchParams, user)) return navigate("/forbidden");

  return user ? (
    <BreadCrumbProvider>
      <DeadlinesProvider>
        <RolesProvider>
          <ProjectProvider>
            <App>{children}</App>
          </ProjectProvider>
        </RolesProvider>
      </DeadlinesProvider>
    </BreadCrumbProvider>
  ) : (
    navigate("/login")
  );
}
