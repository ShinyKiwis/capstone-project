"use client";
import { Typography } from "@/app/_components";

import { usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import useUser from "@/app/hooks/useUser";

///////////// Test session data
let userFullName = "User Name";
let usermail = "username@hcmut.edu.vn";
let userRole = "student";
let profileImgSrc = "/logoHCMUT.png";

interface TitlePathMappings {
  [key: string]: object;
}

interface TitleRoleMappings {
  [key: string]: object;
}

const titleRoleMappings: TitleRoleMappings = {
  // Map user's role with the correct title
  administrate_roles: {
    dean: "Administrative pages",
  },
  program_roles: {
    other: "Program pages",
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
    other: "Assessment pages",
  },
  evaluation_roles: {
    other: "Evaluation pages",
  },
};

const titlePathMappings: TitlePathMappings = {
  // Determine role-title sets with path and param
  "/administrate": {
    any: titleRoleMappings["administrate_roles"],
  },
  "/program": {
    any: titleRoleMappings["program_roles"],
  },
  "/project": {
    specialized: titleRoleMappings["specializedProject_roles"],
    capstone: titleRoleMappings["capstoneProject_roles"],
    any: titleRoleMappings["incorrect_param"],
  },
  "/assessment": {
    any: titleRoleMappings["assessment_roles"],
  },
  "/evaluation": {
    any: titleRoleMappings["evaluation_roles"],
  },
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

const ProfileExpandableSection = ({
  profileImg,
  fullName,
}: {
  profileImg: string;
  fullName: string;
}) => {
  return (
    <div
      className="flex h-14 w-fit flex-auto cursor-pointer items-center gap-3"
      onClick={() => {
        const profileModal = document.getElementById("topBar-profileModal");
        if (profileModal) {
          if (profileModal.style.opacity == "0") {
            // profileModal.style.maxHeight = '25em';
            profileModal.style.display = "flex";
            const fadeTimeout = setTimeout(function removeModal() {
              profileModal.style.opacity = "1.0";
              clearTimeout(fadeTimeout);
            }, 10);
          } else {
            // profileModal.style.maxHeight = '0em';
            profileModal.style.opacity = "0";
            const fadeTimeout = setTimeout(function removeModal() {
              profileModal.style.display = "none";
              clearTimeout(fadeTimeout);
            }, 300);
          }
        }
      }}
    >
      <div className="relative h-11 w-11 overflow-hidden rounded-full px-1 py-1">
        <Image
          src={profileImg}
          fill={true}
          sizes="2.75rem"
          alt="User's profile picture"
        />
      </div>
      <div className="max-h-14 w-fit max-w-xs overflow-hidden whitespace-nowrap font-medium">
        {fullName}
      </div>
      <MdArrowDropDown size={35} />
    </div>
  );
};

const ProfileModal = ({
  profileImg,
  fullName,
  email,
}: {
  profileImg: string;
  fullName: string;
  email: string;
}) => {
  const { logout } = useUser();
  return (
    <div
      className="absolute z-20 w-80 flex-col items-center gap-2 overflow-hidden rounded-xl bg-white py-5 shadow-xl transition-opacity delay-100 duration-200 ease-in-out"
      id="topBar-profileModal"
      style={{
        left: "auto",
        right: "3.5rem",
        top: "5em",
        maxHeight: "25em",
        opacity: "0",
        display: "none",
      }}
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full px-1 py-1">
        <Image
          src={profileImg}
          fill={true}
          sizes="2.75rem"
          alt="User's profile picture"
        />
      </div>
      <div className="w-full overflow-hidden px-20 text-center text-lg font-medium">
        {fullName}
      </div>
      <div className="w-full overflow-hidden px-20 text-center text-sm font-normal">
        {email}
      </div>
      <button
        className="mt-2 w-fit rounded-lg border-2 border-solid bg-red px-10 py-2 font-semibold text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

const PageHeader = () => {
  return (
    <div className="flex h-20 items-center gap-4 pl-8 pr-14 pt-5">
      <div className="w-full flex-auto">
        <Typography variant="h1" text={getTitle()} color="text-darkblue" />
      </div>
      <button className="w-fit flex-auto">
        <FaBell size={25} />
      </button>

      <ProfileExpandableSection
        profileImg={profileImgSrc}
        fullName={userFullName}
      />
      <ProfileModal
        profileImg={profileImgSrc}
        fullName={userFullName}
        email={usermail}
      />
    </div>
  );
};

export default PageHeader;
