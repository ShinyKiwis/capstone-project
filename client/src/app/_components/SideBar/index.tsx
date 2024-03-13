"use client";
import Image from "next/image";
import sidebarItems from "./items";
import { useEffect, useState } from "react";
import SideBarItem from "./SideBarItem";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

const SideBar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <div
      className={`flex h-screen flex-col items-center border-r border-gray-300  py-10 ${toggleSidebar ? "w-64 px-4" : "w-20"} duration-300`}
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
            <TbLayoutSidebarLeftCollapse size={30} />
          ) : (
            <TbLayoutSidebarRightCollapse size={35} />
          )}
        </button>
      </div>
      {sidebarItems.map((item) => {
        return (
          <SideBarItem
            expand={toggleSidebar}
            Icon={item.Icon}
            title={item.title}
            pages={item.pages}
            key={item.title}
          />
        );
      })}
    </div>
  );
};

export default SideBar;
