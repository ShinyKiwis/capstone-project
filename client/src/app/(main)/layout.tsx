"use client";
import { useEffect, useState } from "react";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] =  useState(() => new QueryClient());

  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  console.log();
  useEffect(() => {
    console.log("In app:",user)
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!isValid(pathname, searchParams, user))
    navigate("/forbidden")

  return user ? (
    <QueryClientProvider client={queryClient}>
      {
        <DeadlinesProvider>
          <RolesProvider>
            <ProjectProvider>
              <App>{children}</App>
            </ProjectProvider>
          </RolesProvider>
        </DeadlinesProvider>
      }
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> 
  ):
  navigate('/login')
}

