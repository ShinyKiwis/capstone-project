"use client";
import { Badge, Button, Card, ScrollArea, TextInput, Box } from "@mantine/core";
import { PiSliders } from "react-icons/pi";
import React, { useContext, useEffect } from "react";
import { IoCreate } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import {
  ProjectCard,
  ProjectCardDetail,
  UploadFileModal,
  FilterModal,
  ApproveAllModal,
} from "@/app/_components";
import { useProjects } from "@/app/providers/ProjectProvider";
import { useSearchParams } from "next/navigation";
import useNavigate from "@/app/hooks/useNavigate";
import { FaRegCircleCheck } from "react-icons/fa6";

const Project = () => {
  const projectContextValues = useProjects();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const { projects, getProjects } = projectContextValues;

  useEffect(() => {
    // Change rendered projects on page switch
    console.log("Called get projects")
    getProjects(searchParams.get("project") as string);
  }, [searchParams.get("project")]);

  return (
    <div className="flex h-full flex-col">
      <div className="w-2/5">
        <div className="flex w-full gap-4">
          <TextInput placeholder="Search projects..." className="flex-1" />
          <FilterModal />
        </div>
        <div className="mt-4">
          <Button
            variant="filled"
            leftSection={
              <IoCreate
                size={20}
              />
            }
            onClick={()=>navigate('/project/create')}
          >
            Create project
          </Button>
          <UploadFileModal />
          <Button leftSection={<FaRegCircleCheck />} ms="md" onClick={()=>navigate(`/project?project=${searchParams.get("project")}&action=approve`)}>Approve All</Button>
          {/* <ApproveAllModal /> */}
        </div>
      </div>
      <div className="mt-4 flex w-full overflow-auto">
        <div className="h-full w-2/5">
          <ScrollArea type="hover" h="100%" scrollbars="y" scrollbarSize={4}>
            {projects.map((project: Project) => (
              <ProjectCard projectObject={project} key={project.code} />
            ))}
          </ScrollArea>
        </div>
        <div className="h-full flex-1 px-4 pt-4">
          <ProjectCardDetail />
        </div>
      </div>
    </div>
  );
};

export default Project;
