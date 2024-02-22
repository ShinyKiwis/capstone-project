"use client";

import React, { useEffect, useState } from "react";
import { PageContent, SideBar } from ".";
import { ModalProvider } from "../providers/ModalProvider";
import isAuth from "../lib/isAuth";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a reactquery client
const queryClient = new QueryClient()

const App = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <SideBar />
          <PageContent children={children} />
        </ModalProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    )
  );
};

export default isAuth(App);
