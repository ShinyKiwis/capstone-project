"use client";

import React, { useEffect, useState } from "react";
import { PageContent, SideBar } from ".";
import { ModalProvider } from "../providers/ModalProvider";
import isAuth from "../lib/isAuth";

const App = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <ModalProvider>
        <SideBar />
        <PageContent>
          {children}
        </PageContent>
      </ModalProvider>
    )
  );
};

export default isAuth(App);
