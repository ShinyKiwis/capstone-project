"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "./Typography";
import { usePathname } from "next/navigation";

import { MdManageAccounts } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import {
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaUserGraduate,
} from "react-icons/fa";

interface SideBarItemProps {
  Icon?: any;
  title: string;
  href: string;
}

const SideBarItem = ({ Icon, title, href }: SideBarItemProps) => {
  const pathname = usePathname();
  return (
    <Link href={href} className="mb-2 w-4/5 font-medium">
      {href == pathname ? (
        <div className="flex items-center gap-2 rounded-md bg-blue p-2 text-white ">
          {Icon && <Icon size={25} />}
          <span>{title}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2 py-1 text-gray hover:text-blue duration-300">
          {Icon && <Icon size={25} />}
          <span>{title}</span>
        </div>
      )}
    </Link>
  );
};

const SideBar = () => {
  const sidebarItems = [
    {
      Icon: MdManageAccounts,
      title: "Administration",
      href: "/administrate",
    },
    {
      Icon: FaChalkboardTeacher,
      title: "Program",
      href: "/program",
    },
    {
      Icon: FaProjectDiagram,
      title: "Projects",
      href: "/projects",
      pages: [
        {
          title: "Specialized Projects",
          href: "/projects?project=specialized",
        },
        {
          title: "Capstone Projects",
          href: "/projects?project=capstone",
        },
      ],
    },
    {
      Icon: FaUserGraduate,
      title: "Assessment",
      href: "/assessment",
    },
    {
      Icon: VscGraph,
      title: "Evaluation",
      href: "/evaluation",
    },
  ];

  return (
    <div className="h-full border-r border-gray">
      <div className="flex items-center justify-center py-10">
        <Image src="/logo.svg" width={160} height={160} alt="brand logo" />
      </div>

      <div className="flex flex-col items-center">
        {sidebarItems.map(function (element) {
          return SideBarItem(element);
        })}
      </div>
    </div>
  );
};

export default SideBar;
