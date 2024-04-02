"use client"
import React, { createContext, useContext, useState } from "react";

interface BreadCrumb {
  title: string;
  href: string;
}

interface BreadCrumbContextType {
  breadCrumbs: BreadCrumb[];
  updateBreadCrumb: (title: string, href: string) => void;
  clearBreadCrumb: () => void;
}

const BreadCrumbContext = createContext<BreadCrumbContextType | null>(null);

const BreadCrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);

  const updateBreadCrumb = (title: string, href: string) => {

    const index = breadCrumbs.findIndex((crumb) => crumb.title === title);
    if (index != -1) {
      setBreadCrumbs(breadCrumbs.slice(0, index + 1));
    } else {
      // State is not updated fast enough
      setBreadCrumbs(prevCrumbs => [
        ...prevCrumbs,
        {
          title: title,
          href: href,
        },
      ]);
    }
  };

  const clearBreadCrumb = () => {
    setBreadCrumbs([])
  }

  return (
    <BreadCrumbContext.Provider value={{ breadCrumbs, updateBreadCrumb, clearBreadCrumb }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};

export const useBreadCrumbs = () => {
  const context = useContext(BreadCrumbContext);
  if (!context) {
    throw new Error(
      "useBreadCrumbs must be used inside the BreadCrumbProvider",
    );
  }

  return context;
};
export default BreadCrumbProvider;
