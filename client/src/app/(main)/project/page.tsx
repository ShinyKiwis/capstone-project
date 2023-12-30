"use client";
import {
  Button,
  ProjectCard,
  SearchBox,
  Typography,
  ProjectCardDetail,
} from "@/app/_components";
import { IoOptions } from "react-icons/io5";
import React, { useState } from "react";

interface ProjectHeaderProps {
  type: string;
}

const ProjectHeader = ({ type }: ProjectHeaderProps) => {
  const [projectsPerPage, setProjectsPerPage] = useState("");

  const handleProjectsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    console.log(numericValue);
    setProjectsPerPage(numericValue);
  };
  return (
    <div className="sticky top-0 w-full bg-white pt-12">
      <Typography
        variant="h1"
        text={`${type} Project Enrollment`}
        color="text-darkblue"
      />
      <div className="w-3/6">
        <div className="mt-4 flex gap-4">
          <div className="w-10/12">
            <SearchBox />
          </div>
          <Button
            variant="normal"
            isPrimary={false}
            className="flex w-2/12 items-center justify-center gap-2 text-xl"
          >
            <IoOptions size={25} />
            <span>Filter</span>
          </Button>
        </div>
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

const Project = () => {
  return (
    <div className="w-full">
      <ProjectHeader type="Specialzed" />
      <div className="mt-4 flex gap-4">
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
