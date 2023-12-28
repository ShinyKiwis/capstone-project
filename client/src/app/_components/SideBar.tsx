import React from 'react'
import Image from 'next/image'
// import { MdManageAccounts } from "react-icons/md";

interface SideBarItemProps {
  icon?: any;
  text: string;
}

const SideBarItem = ({icon, text} : SideBarItemProps) => {
    return (
    <div className="inline-flex items-start gap-2 px-2 py-1 relative bg-[#e9e9e9] rounded-[6px]">
        <div>{icon}</div>
        <div className="">
            {text}
        </div>
    </div>
    )
}

const SideBar = () => {
  const sidebarItems = {
    "project": {
      "specializedProjects": {
        href: "/specialized",
        title: "Specialized Projects"
      },
      "capstoneProjects": {
        href: "/capstone",
        title: "Capstone Projects"
      }
    }
  }
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

    </div>
  )
}

export default SideBar