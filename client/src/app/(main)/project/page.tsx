"use client";
import {
  Button,
  ScrollArea,
  TextInput,
  Pagination,
  NativeSelect,
  Text,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import {
  ProjectCard,
  ProjectCardDetail,
  UploadFileModal,
  FilterModal,
} from "@/app/_components";
import Image from "next/image";
import { useProjects } from "@/app/providers/ProjectProvider";
import { usePathname, useSearchParams } from "next/navigation";
import useNavigate from "@/app/hooks/useNavigate";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useAuth } from "@/app/providers/AuthProvider";
import { userHasResource } from "@/app/lib/userHasResource";

const Project = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname()
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    projects,
    projectsAreFetching,
    setRenderingProjectsKey,
    getProjects,
    refreshProjects,
    invalidateAndRefresh,
    handleSearchProjects,
    paginationSize,
    setPaginationSize,
    currentPage,
    setCurrentPage,
    setCurrMaxPages,
    currMaxPages,
  } = useProjects();

  const [search, setSearch] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    // Initial render of projects list
    if (projects.length <= 0) getProjects(searchParams.get("project"));
  }, [projectsAreFetching]);

  useEffect(() => {    
    setSearch("");
    getProjects(searchParams.get("project"));
  }, [searchParams.get("project"), pathName]);

  useEffect(() => {
    // console.log("fileuploaded:",fileUploaded)
    if (fileUploaded) {
      invalidateAndRefresh();
      setFileUploaded(false);
    }
  }, [fileUploaded]);

  const NoData = () => {
    return (
      <div className="mx-auto mt-44 flex flex-col items-center gap-8">
        <Image src="/cat.png" width="150" height="150" alt="empty prompt" />
        <div className="text-gray text-xl">No projects found !</div>
      </div>
    );
  };

  if (
    !userHasResource("approve_projects") &&
    searchParams.get("action") === "approve"
  ) {
    return navigate("/forbidden");
  }

  // Main return
  if (userHasResource("view_projects")) {
    return (
      <div className="flex h-full flex-col">
        <div className="w-full">
          <div className="flex w-3/5 gap-4">
            <TextInput
              placeholder="Search projects id, name, description"
              rightSection={
                <BiSearch
                  size={20}
                  className="group-focus-within:text-blue text-gray cursor-pointer"
                  onClick={(e) => {
                    handleSearchProjects(
                      search,
                      searchParams.get("project") || "",
                    );
                  }}
                />
              }
              className="flex-1"
              value={search}
              onInput={(e) => setSearch(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSearchProjects(
                    search,
                    searchParams.get("project") || "",
                  );
              }}
            />
            <FilterModal />
          </div>

          <div className="mt-4 w-full flex">
            {userHasResource("create_projects") ? (
              <div className="mr-4">
                <Button
                  variant="filled"
                  leftSection={<IoCreate size={20} />}
                  onClick={() => navigate("/project/create")}
                >
                  Create project
                </Button>
                <UploadFileModal object="projects" setFileUploaded={setFileUploaded} />
              </>
            ) : null}

            {userHasResource("approve_projects") ? (
              <Button
                leftSection={<FaRegCircleCheck />}
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
            className={`mt-4 w-full flex gap-8 ${projects.length < 1 ? "hidden" : ""}`}
          >
            <div className="flex items-center gap-2">
              <NativeSelect
                value={paginationSize}
                onChange={(event) => {
                  setPaginationSize(event.currentTarget.value);
                  setCurrentPage(1);
                }}
                data={["1", "5", "10", "20", "50"]}
              />
              <Text size="md" c="gray">
                Projects per page
              </Text>
            </div>
            <Pagination
              value={currentPage}
              onChange={(value) => {
                setCurrentPage(value);
              }}
              total={currMaxPages}
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
                offsetScrollbars='y'
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
