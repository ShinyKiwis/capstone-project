'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typography from "./Typography";
import { usePathname } from 'next/navigation'

import { MdManageAccounts, MdOutlineAnalytics } from "react-icons/md";
import { FaChalkboardTeacher, FaProjectDiagram, FaUserGraduate } from "react-icons/fa";
import { LiaProjectDiagramSolid } from "react-icons/lia";


interface SideBarItemProps {
  icon?: any;
  title: string;
  href: string;
}

const SideBarItem = ({icon, title, href} : SideBarItemProps) => {
    const pathname = usePathname()
    return (
      <Link href={href} className="w-4/5 mb-2">
        <div className="inline-flex items-start text-gray px-2 py-1 bg-white rounded-[6px]">
            <span>{icon}</span>
            <span className="">
              {title}{href === pathname ? "s": "n"}
            </span>
        </div>
      </Link>
    )
}

const SideBar = () => {

  const sidebarItems = [
    {
      icon: <MdManageAccounts />,
      title: "Administration",
      href: "/administrate"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Program",
      href: "/program"
    },
    {
      icon: <LiaProjectDiagramSolid />,
      title: "Specialized Projects",
      href: "/projects"
    },
    {
      icon: <FaProjectDiagram />,
      title: "Capstone Projects",
      href: "/projects"
    },
    {
      icon: <FaUserGraduate />,
      title: "Assessment",
      href: "/assessment"
    },
    {
      icon: <MdOutlineAnalytics />,
      title: "Evaluation",
      href: "/evaluation"
    }
  ]

  return (
    <div className='border-r border-gray h-full'>
      <div className='flex justify-center items-center py-10'>
        <Image
          src="/logo.svg"
          width={160}
          height={160}
          alt="brand logo"
        />
      </div>

      <div className='flex flex-col items-center'>
        {sidebarItems.map(function(element){
            return SideBarItem(element)
          })
        }
      </div>
          
    </div>
  )
}

export default SideBar