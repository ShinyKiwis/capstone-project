"use client";
import {
  Badge,
  Button,
  Card,
  ScrollArea,
  TextInput,
  Box,
  Pagination,
  NativeSelect,
  Text,
} from "@mantine/core";
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
import { useAuth } from "@/app/providers/AuthProvider";

const Project = () => {
  const projectContextValues = useProjects();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, projectsAreFetching, specializedProjects, capstoneProjects, getProjects, setProjects, setViewing } =
    projectContextValues;

  const [projectsList, setprojectsList] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [maxPages, setMaxPages] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false)

  useEffect(() => {
    // Initial render of project lists
    if (projects.length <=0)
      getProjects(searchParams.get("project"))
  }, [projectsAreFetching]);

  useEffect(() => {
    // Switch project type
    getProjects(searchParams.get("project"))
    // Reset search box, pagination on page change
    setSearch("");
    setActivePage(1);
    handlePageSizeChange("10");
  }, [searchParams.get("project")]);

  // if (searchParams.get("project") === 'specialized')
  //   projectsList = specializedProjects;
  // else
  //   projectsList = capstoneProjects;

  useEffect(() => {
    // console.log(fileUploaded)
    if(fileUploaded){
      // getProjects(searchParams.get("project") as string)
      setFileUploaded(false)
    }
  }, [fileUploaded])

  async function handleSearchSubmit() {
    axios
      .get(
        `http://localhost:3500/projects?search=${search}&stage=${searchParams.get("project") === "specialized" ? "1" : "2"}`,
      )
      .then((res) => {
        // setProjects(res.data.projects);
        // setViewing(res.data.projects[0]);
      })
      .catch((err) => console.error("Error searching project:", err));
  }

  async function handlePageSizeChange(newPageSize: string) {
    axios
      .get(
        `http://localhost:3500/projects?page=1&limit=${newPageSize}&stage=${searchParams.get("project") === "specialized" ? "1" : "2"}`,
      )
      .then((res) => {
        setPageSize(newPageSize);
        setMaxPages(res.data.total);
        // setProjects(res.data.projects);
        // setViewing(res.data.projects[0]);
      })
      .catch((err) => console.error("Error changing projects page size:", err));
  }

  async function handlePageChange(newPage: number, currentPageSize: string) {
    axios
      .get(
        `http://localhost:3500/projects?page=${newPage}&limit=${currentPageSize}&stage=${searchParams.get("project") === "specialized" ? "1" : "2"}`,
      )
      .then((res) => {
        // setProjects(res.data.projects);
        // setViewing(res.data.projects[0]);
      })
      .catch((err) => console.error("Error changing projects page size:", err));
  }

  const NoData = () => {
    return (
      <div className="mx-auto mt-44 flex flex-col items-center gap-8">
        <Image src="/cat.png" width="150" height="150" alt="empty prompt" />
        <div className="text-gray text-xl">No projects found !</div>
      </div>
    );
  };
  
  if (
    !user?.resources.includes("approve_projects") &&
    searchParams.get("action") === "approve"
  ) {
    return navigate("/forbidden");
  }

  // Main return
  if (user?.resources.includes("view_projects")) {
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
            {user.resources.includes("create_projects") ? (
              <>
                <Button
                  variant="filled"
                  leftSection={<IoCreate size={20} />}
                  onClick={() => navigate("/project/create")}
                >
                  Create project
                </Button>
                <UploadFileModal setFileUploaded={setFileUploaded}/>
              </>
            ) : null}

            {user.resources.includes("approve_projects") ? (
              <Button
                leftSection={<FaRegCircleCheck />}
                ms="md"
                onClick={() =>
                  navigate(
                    `/project/approve?project=${searchParams.get("project")}`,
                  )
                }
              >
                Approve projects
              </Button>
            ) : null}
          </div>

          <div
            className={`mt-4 flex gap-4 ${projectsList.length < 1 ? "hidden" : ""}`}
          >
            <div className="flex w-1/2 items-center gap-2">
              <NativeSelect
                value={pageSize}
                onChange={(event) => {
                  setPageSize(event.currentTarget.value);
                  setActivePage(1);
                  handlePageSizeChange(event.currentTarget.value);
                }}
                data={["5", "10", "20", "50"]}
              />
              <Text size="md" c="gray">
                Projects per page
              </Text>
            </div>
            <Pagination
              value={activePage}
              onChange={(value) => {
                setActivePage(value);
                handlePageChange(value, pageSize);
              }}
              total={maxPages}
            />
          </div>
        </div>

        {projects.length < 1 ? (
          <NoData />
        ) : (
          <div className="mt-4 flex w-full overflow-auto">
            <div className="h-full w-2/5">
              <ScrollArea
                type="hover"
                h="100%"
                scrollbars="y"
                scrollbarSize={4}
              >
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
  }
  return navigate("/forbidden");
};

export default Project;
