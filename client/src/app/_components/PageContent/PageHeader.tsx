"use client";
import { Button, Profile, Typography } from "@/app/_components";
import { usePathname, useSearchParams } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import useUser from "@/app/hooks/useUser";
import { useState } from "react";
import LogoutButton from "../UserAction/Buttons/LogoutButton";

let userRole = "student";

interface TitlePathMappings {
  [key: string]: object;
}

interface TitleRoleMappings {
  [key: string]: object;
}

const titleRoleMappings: TitleRoleMappings = {
	// Map user's role with the correct title
	administrate_roles: {
		dean: "Administrative pages"
	},
	program_roles: {
		other: "Program pages"
	},
	specializedProject_roles: {
		student: "Specialized project enrollment",
		other: "Specialized project management",
	},
	capstoneProject_roles: {
		student: "Capstone project enrollment",
		other: "Capstone project management",
	},
	assessment_roles: {
		other: "Assessment pages"
	},
	evaluation_roles: {
		other: "Evaluation pages"
	},
	specializedProjectCreation_roles: {
		supervisor: "Create a new specialized project"
	},
	capstoneProjectCreation_roles: {
		supervisor: "Create a new capstone project"
	}
}

const titlePathMappings: TitlePathMappings = {
	// Determine role-title sets with path and param
	'/administrate': {
		'any': titleRoleMappings['administrate_roles']
	},
	'/program': {
		'any': titleRoleMappings['program_roles']
	},
	'/project': {
		'specialized': titleRoleMappings['specializedProject_roles'],
		'capstone': titleRoleMappings['capstoneProject_roles'],
		'any': titleRoleMappings['incorrect_param']
	},
	'/assessment': {
		'any': titleRoleMappings['assessment_roles']
	},
	'/evaluation': {
		'any': titleRoleMappings['evaluation_roles']
	},
	'/project/create': {
		'specialized': titleRoleMappings['specializedProjectCreation_roles'],
		'capstone': titleRoleMappings['capstoneProjectCreation_roles'],
	}
};

function getTitle() {
  let currentPath = usePathname();
  let searchParam = useSearchParams();
  let currParam = null;
  searchParam.forEach((value, key) => {
    currParam = value;
  });

  // Get title sets based on current path
  let pathRoles = titlePathMappings[currentPath];

  // Get title sets based on path's params
  let paramRoles: any;
  if (currParam) {
    // console.log("Current param:", currParam);
    if (currParam in pathRoles) {
      paramRoles = pathRoles[currParam];
    } else if ("any" in pathRoles) paramRoles = pathRoles["any"];
    else return "Invalid parameter, to 404";
  } else {
    return "No param provided, to 404?";
  }
  // console.log(paramRoles)

  // Determine title based on user's role
  if (userRole) {
    var finalTitle = null;
    if (userRole in paramRoles) {
      finalTitle = paramRoles[userRole];
    } else {
      if ("other" in paramRoles) finalTitle = paramRoles["other"];
    }

    if (finalTitle) return finalTitle;
    else return "No defined title for current role, redirect 404 ?";
  } else return "No role found, not logged in ?";
}

const PageHeader = () => {
  const [toggleProfileModal, setToggleProfileModal] = useState(false);
  const user = useUser();

  return (
    <div className="relative flex h-20 items-center gap-4 pl-8 pr-14 pt-5">
      <div>
        <Typography variant="h1" text={getTitle()} color="text-darkblue" />
      </div>
      <div
        className="ms-auto flex gap-4"
        onClick={() => setToggleProfileModal(!toggleProfileModal)}
      >
        <button className="w-fit">
          <FaBell size={25} />
        </button>
        <div className="flex gap-2 items-center">
          <Profile username={user!.name} type="horizontal" />
          <MdArrowDropDown size={35} className="cursor-pointer" />
        </div>
      </div>
      <div
        className={`absolute right-14 top-20 z-20 rounded-md bg-white p-8 ${toggleProfileModal
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }  transition-opacity duration-500 ease-in-out`}
        style={{
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          border: "0.5px solid #D7D7D7",
        }}
      >
        <Profile username={user!.name} type="vertical" email={user!.email} />
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
