"use client";
import Image from "next/image";
import sidebarItems from "./items";
import { useEffect, useState } from "react";
import SideBarItem from "./SideBarItem";
import {
  IconSquareChevronLeft,
  IconSquareChevronRight,
} from "@tabler/icons-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { userHasResource, userResourcesIncludes } from "@/app/lib/userHasResource";

const SideBar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { user } = useAuth();

  return (
    <div
      className={`flex h-screen flex-col items-center border-r border-gray-300  py-10 ${toggleSidebar ? "w-72 px-4" : "w-20"} duration-300`}
    >
      <div
        className={`mb-4 flex w-[85%] items-center ${toggleSidebar ? "justify-between" : "justify-center"}`}
      >
        {toggleSidebar && (
          <Image src="/logo.svg" alt="software logo" width={100} height={25} />
        )}
        <button
          className="text-gray-400 hover:text-gray-800"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          {toggleSidebar ? (
            <IconSquareChevronLeft size={30} aria-label="sidebar-expand-button" />
          ) : (
            <IconSquareChevronRight size={35} aria-label="sidebar-expand-button" />
          )}
        </button>
      </div>
      <div className={`overflow-auto p-0 ${toggleSidebar ? "w-full" : ''}`}>
        {sidebarItems.map((item) => {
          return (userResourcesIncludes(item.resource)
          ) ? (
            <SideBarItem
              expand={toggleSidebar}
              Icon={item.Icon}
              title={item.title}
              pages={item.pages}
              key={item.title}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SideBar;
