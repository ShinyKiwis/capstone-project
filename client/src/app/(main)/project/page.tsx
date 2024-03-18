"use client";
import { Badge, Button, Card, ScrollArea, TextInput, Box } from "@mantine/core";
import { PiSliders } from "react-icons/pi";
import React, { useContext, useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import {
  ProjectCard,
  ProjectCardDetail,
  UploadFileModal,
  FilterModal,
  ApproveAllModal,
} from "@/app/_components";
import Image from "next/image";
import { useProjects } from "@/app/providers/ProjectProvider";
import { useSearchParams } from "next/navigation";
import useNavigate from "@/app/hooks/useNavigate";
import { FaRegCircleCheck } from "react-icons/fa6";
import axios from "axios";

const Project = () => {
  const projectContextValues = useProjects();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const { projects, setProjects, getProjects } = projectContextValues;

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Change rendered projects on page switch
    console.log("Called get projects");
    getProjects(searchParams.get("project") as string);
    // Reset search box on page change
    setSearch("");
  }, [searchParams.get("project")]);

  async function handleSearchSubmit() {
    axios
      .get(
        `http://localhost:3500/projects?search=${search}&stage=${searchParams.get("project") === "specialized" ? "1" : "2"}`,
      )
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => console.error("Error searching project:", err));
  }

  const NoData = () => {
    return (
      <div className="mx-auto mt-44 flex flex-col items-center gap-8">
        <Image src="/cat.png" width="150" height="150" alt="empty prompt" />
        <div className="text-gray text-xl">No projects found !</div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="w-2/5">
        <div className="flex w-full gap-4">
          <TextInput
            placeholder="Search projects id, name, description"
            rightSection={
              <BiSearch
                size={20}
                className="group-focus-within:text-blue text-gray cursor-pointer"
                onClick={handleSearchSubmit}
              />
            }
            className="flex-1"
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
          />
          <FilterModal />
        </div>
        <div className="mt-4">
          <Button
            variant="filled"
            leftSection={<IoCreate size={20} />}
            onClick={() => navigate("/project/create")}
          >
            Create project
          </Button>
          <UploadFileModal />
          <Button
            leftSection={<FaRegCircleCheck />}
            ms="md"
            onClick={() =>
              navigate(
                `/project?project=${searchParams.get("project")}&action=approve`,
              )
            }
          >
            Approve All
          </Button>
          {/* <ApproveAllModal /> */}
        </div>
      </div>
      {projects.length < 1 ? (
        <NoData />
      ) : (
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
      )}
    </div>
  );
};

export default Project;
