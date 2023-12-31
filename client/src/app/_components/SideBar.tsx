"use client";

import React, { useEffect } from "react";
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
  path: string;
  pages: any;
}

const parseUrlString = (pathString: string) => {
  const pathName = pathString.split('?')[0];
  const param = pathString.split('?')[1];
  const paramName = param.split('=')[0];
  const paramVal = param.split('=')[1];

  return({path: pathName, paramName: paramName, paramVal: paramVal})
}

const SideBarItem = ({ Icon, title, path, pages }: SideBarItemProps) => {
  const pathname = usePathname();

  const toggleAccordion = (accordBtn: any) => {
    let currTarget = accordBtn.parentNode.childNodes[1];
    
    if (currTarget.style.maxHeight == '0px'){
      currTarget.style.maxHeight = '5em';
    } else {
      currTarget.style.maxHeight = "0px";
    }

  }

  var selectedOption = null;
  // console.log("Current path:",pathname);
  return (
    <div className="mb-2 w-4/5" key={title}>
      <button className="font-medium w-full" onClick={(e)=>toggleAccordion(e.currentTarget)}>
        {path == pathname ? (
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
      </button>

      <div 
        className= "ease-in-out duration-300 delay-150"
        style={{maxHeight: path == pathname ? '5em' : '0px', overflow:'hidden'}}
      >
        {pages.map(function(accordLink: any){     // Process each subpage
          const searchParam = useSearchParams();
          let urlContent = parseUrlString(accordLink.href);
          let selected = false
          if (searchParam.has(urlContent.paramName) && searchParam.get(urlContent.paramName) == urlContent.paramVal)  
            selected = true

          return(
            <div key={accordLink.href}>
              <Link href={accordLink.href} className="block ml-4">
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
    </div>
  );
};

const SideBar = () => {
  const sidebarItems = [
    {
      Icon: MdManageAccounts,
      title: "Administration",
      path: "/administrate",
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
      path: "/program",
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
      path: '/project',
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
      path: '/assessment',
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
      path: '/evaluation',
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
          return <SideBarItem {...element} key={element.title}/>;
        })}
      </div>
    </div>
  );
};

export default SideBar;
