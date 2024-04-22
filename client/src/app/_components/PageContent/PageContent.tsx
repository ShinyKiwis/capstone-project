import React from "react";
import PageHeader from "./PageHeader";
import BreadCrumbs from "../BreadCrumbs";

const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col px-8 pt-8">
      <BreadCrumbs />
      {/* <PageHeader /> */}
      <div className="flex-1 bg-white pb-4 overflow-hidden">{children}</div>
    </div>
  );
};

export default PageContent;
