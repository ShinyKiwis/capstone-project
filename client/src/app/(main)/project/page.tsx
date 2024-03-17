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
import { ProjectContext } from "@/app/providers/ProjectProvider";
import { useSearchParams } from "next/navigation";

const Project = () => {
  const projectContext = useContext(ProjectContext);
  const searchParams = useSearchParams();
  if (!projectContext) return <div>Loading Projects</div>;
  const { projects, viewing, setViewing, getProjects } = projectContext;

  useEffect(() => {
    // Change rendered projects on page switch
    // console.log("Called get projects")
    getProjects(searchParams.get('project') as string)
  }, [searchParams.get('project'), projects]);
  


  return (
    <div className="flex h-full flex-col">
      <div className="w-2/5">
        <div className="flex w-full gap-4">
          <TextInput placeholder="Search projects..." className="flex-1" />
          <FilterModal />
        </div>
        <div className="mt-4">
          <Button variant="filled" leftSection={<IoCreate size={20} /> }>
            Create project
          </Button>
          {/* <Button
            variant="filled"
            leftSection={<MdFileUpload size={20} />}
            className="ms-4"
          >
            Upload project
          </Button> */}
          <UploadFileModal />
          <ApproveAllModal />
        </div>
      </div>
      <div className="mt-4 flex w-full overflow-auto">
        <div className="h-full w-2/5">
          <ScrollArea type="hover" h="100%" scrollbars="y" scrollbarSize={4}>
            {projects.map((project:Project) => (
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
