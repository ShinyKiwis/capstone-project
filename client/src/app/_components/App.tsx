import React, { useEffect } from "react";
import SideBar from "./SideBar";
import PageContent from "./PageContent/PageContent";

const App = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default App;
