"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
  paths: string[];
  pages: any;
}

const parseUrlString = (pathString: string) => {
  const pathName = pathString.split("?")[0];
  const param = pathString.split("?")[1];
  const paramName = param ? param.split("=")[0] : "";
  const paramVal = param ? param.split("=")[1] : "";

  return { path: pathName, paramName: paramName, paramVal: paramVal };
};

const SideBarItem = ({ Icon, title, paths, pages }: SideBarItemProps) => {
  const pathname = usePathname();
  const searchParam = useSearchParams();

  let currPageBelongToPaths = paths.some((path) => pathname.startsWith(path));

  const toggleAccordion = (accordBtn: any) => {
    let currTarget = accordBtn.parentNode.childNodes[1];

    if (currTarget.style.maxHeight == "0px") {
      currTarget.style.maxHeight = "8em";
    } else {
      currTarget.style.maxHeight = "0px";
    }
  };

  var selectedOption = null;
  // console.log("Current path:",pathname);
  return (
    <div className="mb-2 w-4/5" key={title}>
      <button
        className="w-full font-medium"
        onClick={(e) => toggleAccordion(e.currentTarget)}
      >
        {currPageBelongToPaths ? (
          <div className="flex items-center gap-2 rounded-md bg-blue p-2 text-white ">
            {Icon && <Icon size={25} />}
            <span>{title}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 py-1 text-gray duration-300 hover:text-blue">
            {Icon && <Icon size={25} />}
            <span>{title}</span>
          </div>
        )}
      </button>

      <div
        className="delay-150 duration-300 ease-in-out"
        style={{
          maxHeight: currPageBelongToPaths ? "fit-content" : "0px",
          overflow: "hidden",
        }}
      >
        {pages.map(function (accordLink: any) {
          // Process each subpage
          let urlContent = parseUrlString(accordLink.href);
          let selected = false;
          if (
            (searchParam.has(urlContent.paramName) &&
              searchParam.get(urlContent.paramName) == urlContent.paramVal) ||
            (searchParam.size === 0 && urlContent.path === pathname)
          )
            selected = true;

          return (
            <div key={accordLink.href}>
              <Link href={accordLink.href} className="ml-4 block">
                {selected ? (
                  <span className="font-medium text-blue hover:text-blue">
                    {accordLink.title}
                  </span>
                ) : (
                  <span className="text-gray hover:text-blue">
                    {accordLink.title}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SideBar = () => {
  const sidebarItems = [
    {
      Icon: MdManageAccounts,
      title: "Administration",
      paths: ["/administrate"], // paths belonging to the sidebar tab option
      pages: [
        {
          title: "Manage users",
          href: "/administrate/users",
        },
        {
          title: "Manage roles",
          href: "/administrate/roles",
        },
        {
          title: "Set project registration deadline",
          href: "/administrate/deadline",
        },
      ],
    },
    {
      Icon: FaChalkboardTeacher,
      title: "Program",
      paths: ["/program"],
      pages: [
        {
          title: "Manage programs",
          href: "/program?action=manageProgram",
        },
        {
          title: "Manage SOs, PIs",
          href: "/program?action=manageOBE",
        },
      ],
    },
    {
      Icon: FaProjectDiagram,
      title: "Projects",
      paths: [
        "/project",
        "/project/create",
        "/project/approve",
        "/project/edit",
      ],
      pages: [
        {
          title: "Specialized Projects",
          href: "/project?project=specialized",
        },
        {
          title: "Capstone Projects",
          href: "/project?project=capstone",
        },
      ],
    },
    {
      Icon: FaUserGraduate,
      title: "Assessment",
      paths: ["/assessment"],
      pages: [
        {
          title: "Assessment schemes",
          href: "/assessment?manage=schemes",
        },
        {
          title: "Assessment records",
          href: "/assessment?manage=records",
        },
      ],
    },
    {
      Icon: VscGraph,
      title: "Evaluation",
      paths: ["/evaluation"],
      pages: [
        {
          title: "Input assessments",
          href: "/evaluation?action=inputAssesment",
        },
        {
          title: "View reports",
          href: "/evaluation?action=report",
        },
      ],
    },
  ];

  return (
    <div className="h-screen w-64 border-r border-gray">
      <div className="flex items-center justify-center py-10">
        <Image src="/logo.svg" width={160} height={160} alt="brand logo" />
      </div>

      <div className="flex flex-col items-center">
        {sidebarItems.map(function (element) {
          return <SideBarItem {...element} key={element.title} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;
