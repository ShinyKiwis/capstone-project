"use client"

import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const pageTitleMappings: PageTitleMappings = {
  "/management/users": "Users Management",
  "/management/deadline": "Deadline Management",
  "/management/roles": "Roles Management",
  "/project?project=specialized": "Specialized Projects"
}

interface PageTitleMappings {
  [key:string]: string
}

interface PageTitleContextType {
  pageTitle: string;
  setPageTitle: (arg: string) => void;
};
export const PageTitleContext = createContext<PageTitleContextType | null>(
  null,
);

const PageTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams().toString()
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState(pageTitleMappings[pathname + (searchParams ? `?${searchParams}` : "")]);
  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitleContext = () => {
  const context = useContext(PageTitleContext);
  if(!context) {
    throw new Error("usePageTitleContext must be used inside the PageTitleProvider")
  }

  return context
};

export default PageTitleProvider;
