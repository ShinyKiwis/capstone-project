import React, { useEffect } from "react";
import SideBar from "./SideBar";
import PageContent from "./PageContent/PageContent";
import { useBreadCrumbs } from "../providers/BreadCrumbProvider";
import { usePathname } from "next/navigation";

const App = ({ children }: { children: React.ReactNode }) => {
  const {clearBreadCrumb} = useBreadCrumbs()
  const pathname = usePathname()

  useEffect(() => {
    console.log(!["program"].includes(pathname.replace("/", "")))
    if(!["program"].includes(pathname.replace("/", ""))){
      clearBreadCrumb()
    }
  }, [pathname])
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default App;
