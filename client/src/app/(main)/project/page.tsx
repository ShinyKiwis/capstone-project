"use client";
import {
  Button,
  ProjectCard,
  SearchBox,
  Typography,
  ProjectCardDetail,
} from "@/app/_components";
import { IoOptions, IoCreate } from "react-icons/io5";
import { RiUpload2Fill } from "react-icons/ri";
import React, { useContext, useState } from "react";
import { ModalContext } from "@/app/providers/ModalProvider";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";
import hasRole from "@/app/lib/hasRole";

interface ProjectHeaderProps {
  type: string;
}

const ProjectHeader = ({ type }: ProjectHeaderProps) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const [projectsPerPage, setProjectsPerPage] = useState("");
  const { toggleModal, setModalType } = modalContextValue;
  const user = useUser()

  const handleProjectsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    console.log(numericValue);
    setProjectsPerPage(numericValue);
  };

  const handleToggleModal = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    toggleModal(true)
    setModalType("filter")
  }
  return (
    <div className="sticky top-0 w-full bg-white pt-2">
      <div className="w-3/6">
        <div className="mt-4 flex gap-4">
          <div className="w-10/12">
            <SearchBox placeholder="Search projects..."/>
          </div>
          <Button
            variant="normal"
            isPrimary={false}
            className="flex w-2/12 items-center justify-center gap-2 text-xl"
            onClick={handleToggleModal}
          >
            <IoOptions size={25} />
            <span>Filter</span>
          </Button>
        </div>
        {
          !hasRole("student")  && <div className="flex gap-4 mt-4">
            <Button isPrimary variant="normal" className="flex gap-2 px-4 py-2 items-center">
              <IoCreate size={25}/>
              Create project
            </Button>
            <Button isPrimary variant="normal" className="flex gap-2 px-4 py-2 items-center">
              <RiUpload2Fill size={25}/>
              Upload file
            </Button>
          </div>
        }
        <div className="mt-4 w-fit font-medium text-blue">
          <span>View: </span>
          <input
            type="text"
            placeholder="10"
            value={projectsPerPage}
            onChange={handleProjectsPerPageChange}
            className="mx-2 h-12 w-12 rounded-md border-2 border-gray text-center text-gray outline-none focus:border-blue focus:text-blue"
          />
          <span>projects per page</span>
        </div>
      </div>
    </div>
  );
};

const NoData = () => {
  return (
    <div className="mx-auto flex flex-col gap-8 items-center mt-44">
      <Image src="/cat.png" width="150" height="150" alt="empty prompt"/>
      <Typography variant="p" text="There is no project at the moment. Please come back later" className="text-gray text-xl"/>
    </div>
  )
}

const Project = () => {
  return (
    <div className="w-full">
      <ProjectHeader type="Specialzed" />
      <div className="mt-4 flex gap-4 flex-auto">
        {/* <NoData /> */}
        <div className="flex w-1/2 flex-col gap-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <div className="w-1/2">
          <ProjectCardDetail />
        </div>
      </div>
    </div>
  );
};

export default Project;
