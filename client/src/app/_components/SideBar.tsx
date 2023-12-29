"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdManageAccounts } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import {
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaUserGraduate,
  FaPlus,
} from "react-icons/fa";

interface SideBarItemProps {
  Icon?: any;
  title: string;
  pages: any;
}

const toggleAccordion = (accordBtn: any) => {
  let accordionContent = accordBtn.parentNode.childNodes[1];
  accordionContent.classList.toggle('hidden');
}

const SideBarItem = ({ Icon, title, pages }: SideBarItemProps) => {
  const pathname = usePathname();
  console.log("Current path:",pathname)
  return (
    // <Link href={href} className="mb-2 w-4/5 font-medium">
    //   {href == pathname ? (
    //     <div className="flex items-center gap-2 rounded-md bg-blue p-2 text-white ">
    //       {Icon && <Icon size={25} />}
    //       <span>{title}</span>
    //     </div>
    //   ) : (
    //     <div className="flex items-center gap-2 px-2 py-1 text-gray hover:text-blue duration-300">
    //       {Icon && <Icon size={25} />}
    //       <span>{title}</span>
    //     </div>
    //   )}
    // </Link>
    <div className="mb-2 w-4/5">
      <button className="font-medium w-full" onClick={(e)=>toggleAccordion(e.currentTarget)}>
        <div className="flex items-center gap-2 px-2 py-1 text-gray hover:text-blue duration-300">
          {Icon && <Icon size={25} />}
          <span>{title}</span>
          <span className="float-right">
            <FaPlus size={15} />
          </span>
        </div>
      </button>

      <div className="hidden">
        {pages.map(function(accordLink: any){
          return(
            <div>
              <Link href={accordLink.href} className="block ml-4">
                <span className="text-gray hover:text-blue">{accordLink.title}</span>
              </Link>
            </div>
          )
        })
        }
      </div>
    </div>
  );
};

const SideBar = () => {
  const sidebarItems = [
    {
      Icon: MdManageAccounts,
      title: "Administration",
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
      href: "/evaluation",
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
