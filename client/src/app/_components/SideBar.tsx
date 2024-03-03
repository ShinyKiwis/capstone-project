"use client";

import React, { useState } from "react";
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
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";
import { AiOutlineProject } from "react-icons/ai";
import { PiExam } from "react-icons/pi";

interface SideBarItemProps {
  Icon?: any;
  title: string;
  paths: string[];
  pages: any;
  expanded: boolean;
}

const parseUrlString = (pathString: string) => {
  const pathName = pathString.split('?')[0];
  const param = pathString.split('?')[1];
  const paramName = param.split('=')[0];
  const paramVal = param.split('=')[1];

  return ({ path: pathName, paramName: paramName, paramVal: paramVal })
}

const SideBarItem = ({ Icon, title, paths, pages, expanded }: SideBarItemProps) => {
  const pathname = usePathname();
  const searchParam = useSearchParams();

  let currPageBelongToPaths = paths.some((path) => pathname.startsWith(path));

  const toggleAccordion = (accordBtn: any) => {
    let currTarget = accordBtn.parentNode.childNodes[1];

    if (currTarget.style.maxHeight == '0px') {
      currTarget.style.maxHeight = '5em';
    } else {
      currTarget.style.maxHeight = "0px";
    }

  }

  var selectedOption = null;
  // console.log("Current path:",pathname);
  return (
    <div className="mb-2 w-4/5 mx-1 relative group" key={title}>
      <button className="font-medium w-full" onClick={(e) => toggleAccordion(e.currentTarget)}>
        {currPageBelongToPaths ? (
          <div className={`flex items-center rounded-md bg-lighterblue p-2 text-blue ${expanded ? "gap-2" : "aspect-square justify-center"}`}>
            {Icon && <Icon size={24} />}
            <span
              className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 grow-0"} text-left`}
            >
              {title}
            </span>
          </div>
        ) : (
          <div className={`flex items-center p-2 text-gray rounded-md hover:bg-clearblue hover:text-blue duration-300 ${expanded ? "gap-2" : "aspect-square justify-center"}`}>
            {Icon && <Icon size={24} className="aspect-square" />}
            <span
              className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 h-0"} text-left`}
            >
              {title}
            </span>
          </div>
        )}
      </button>

      <div
        className={` overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 h-0"}`}
        style={{ maxHeight: currPageBelongToPaths ? '5em' : '0px', overflow: 'hidden' }}
      >
        {pages.map(function (accordLink: any) {     // Process each subpage
          let urlContent = parseUrlString(accordLink.href);
          let selected = false
          if (searchParam.has(urlContent.paramName) && searchParam.get(urlContent.paramName) == urlContent.paramVal)
            selected = true

          return (
            <div key={accordLink.href}>
              <Link href={accordLink.href} className="block ml-4 my-2">
                {selected ?
                  <span className="text-blue font-medium hover:text-blue">{accordLink.title}</span>
                  :
                  <span className="text-gray hover:text-blue">{accordLink.title}</span>
                }

              </Link>
            </div>
          )
        })
        }
      </div>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 inset-y-1.5
          bg-clearblue text-blue text-sm
          invisible opacity-90 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          z-10
      `}
        >
          {title}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  const [expanded, setExpanded] = useState(true);
  const sidebarItems = [
    {
      Icon: MdManageAccounts,
      title: "Administration",
      paths: ["/administrate"],             // paths belonging to the sidebar tab option
      pages: [
        {
          title: "Manage users",
          href: "/administrate?manage=userManage",
        },
        {
          title: "Set project registration deadline",
          href: "/administrate?manage=registrationDeadline",
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
      Icon: AiOutlineProject,
      title: "Projects",
      paths: ['/project', '/project/create', '/project/approve', '/project/edit'],
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
      Icon: PiExam,
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
      paths: ['/evaluation'],
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
    <div className="h-screen border-r border-gray">
      <div className={`w-4/5 flex items-center  py-10 mx-auto ${expanded ? "justify-between" : "justify-center"}`}>
        <Image
          src="/logo.svg"
          width={48}
          height={48}
          alt="brand logo"
          className={`overflow-hidden transition-all ${expanded ? "" : "w-0"}`}
        />
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
          {expanded ? <RiExpandLeftLine /> : <RiExpandRightLine />}
        </button>
      </div>

      <div className="flex flex-col items-center mx-2">
        {sidebarItems.map(function (element) {
          return <SideBarItem {...element} expanded={expanded} key={element.title} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;
