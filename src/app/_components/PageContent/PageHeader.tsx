"use client";

import React, { useContext } from "react";
import { Profile } from "..";
import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { usePageTitleContext } from "@/app/providers/PageTitleProvider";
import { Text } from "@mantine/core";

const PageHeader = () => {
  const { pageTitle } = usePageTitleContext();
  return (
    <div className="relative flex h-20 items-center gap-4 px-8 pt-5">
      <Text size="xl" fw={700} c="blue">
        {pageTitle}
      </Text>
      <div className="ms-auto flex gap-4">
        <button className="w-fit">
          <FaBell size={20} />
        </button>
        <div
          className="flex items-center gap-2"
          // onClick={() => setToggleProfileModal(!toggleProfileModal)}
        >
          <Profile username="John Doe" type="horizontal" />
          <MdArrowDropDown size={35} className="cursor-pointer" />
        </div>
      </div>

      {/* <div
        className={`absolute right-14 top-20 z-20 rounded-md bg-white p-8 ${
          toggleProfileModal
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
          <Button>Logout</Button>
        </div>
      </div> */}
    </div>
  );
};

export default PageHeader;
