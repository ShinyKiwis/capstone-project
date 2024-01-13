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
import { FaCheckCircle } from "react-icons/fa";
import React, { useContext, useEffect, useState, createContext } from "react";
import { ModalContext } from "@/app/providers/ModalProvider";
import {
  EnrolledProjContext,
  EnrolledProjProvider,
} from "@/app/providers/EnrolledProjProvider";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";
import hasRole from "@/app/lib/hasRole";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ProjectContext } from "@/app/providers/ProjectProvider";

type ProjectData = {
  code: number;
  name: string;
  stage: number;
  description: string;
  tasks: string;
  references: string;
  status: string;
  semester: {
    year: number;
    no: number;
    start: string;
    end: string;
  };
  requirements: any[];
  students: {
    name: string;
    userId: string;
    credits: number;
    generation: number;
    GPA: string;
    enrolledAt: string;
  }[];
  supervisors: {
    id: number;
    email: string;
    username: string;
    name: string;
  }[];
  majors: {
    id: number;
    name: string;
  }[];
  branches: {
    id: number;
    name: string;
  }[];
  studentsCount: number;
  limit: number;
};

const ProjectHeader = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const [projectsPerPage, setProjectsPerPage] = useState("");
  const { toggleModal, setModalType } = modalContextValue;
  const searchParams = useSearchParams();

  const handleProjectsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    console.log(numericValue);
    setProjectsPerPage(numericValue);
  };

  const handleToggleModal = (event: React.SyntheticEvent, type: string) => {
    event.stopPropagation();
    setModalType(type);
    toggleModal(true);
  };
  return (
    <div className="sticky top-0 w-full bg-white pt-2">
      <div className="w-3/6">
        <div className="mt-4 flex gap-4">
          <div className="w-10/12">
            <SearchBox placeholder="Search projects..." />
          </div>
          <Button
            variant="normal"
            isPrimary={false}
            className="flex w-2/12 items-center justify-center gap-2 text-xl"
            onClick={(e) => handleToggleModal(e, "filter")}
          >
            <IoOptions size={25} />
            <span>Filter</span>
          </Button>
        </div>
        {!hasRole("student") && (
          <div className="mt-4 flex gap-4">
            {!hasRole("student") && (
              <Button isPrimary variant="normal" className="px-4 py-2">
                <Link href="" className="flex items-center gap-2">
                  <FaCheckCircle size={23} />
                  Approve projects
                </Link>
              </Button>
            )}
            <Button isPrimary variant="normal" className="px-4 py-2">
              <Link
                href={`/project/create?project=${searchParams.get("project")}`}
                className="flex items-center gap-2"
              >
                <IoCreate size={25} />
                Create project
              </Link>
            </Button>
            <Button
              isPrimary
              variant="normal"
              className="flex items-center gap-2 px-4 py-2"
              onClick={(e) => handleToggleModal(e, "upload")}
            >
              <RiUpload2Fill size={25} />
              Upload file
            </Button>
          </div>
        )}
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
    <div className="mx-auto mt-44 flex flex-col items-center gap-8">
      <Image src="/cat.png" width="150" height="150" alt="empty prompt" />
      <Typography
        variant="p"
        text={`There is no project at the moment. ${
          hasRole("student")
            ? "Please come back later"
            : "Please create your project"
        }!`}
        className="text-xl text-gray"
      />
    </div>
  );
};

const Project = () => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading</div>;
  const { projects, viewing, setViewing } = projectContext;

  return (
    <div className="w-full">
      <ProjectHeader />
      <EnrolledProjProvider>
        <div className="mt-4 flex flex-auto gap-4">
          {projects.length != 0 ? (
            <>
              <div className="flex w-1/2 flex-col gap-4">
                {projects.map(function (project) {
                  return (
                    <ProjectCard
                      key={project.code}
                      projectObject={project}
                      detailedViewSetter={setViewing}
                    />
                  );
                })}
              </div>
              <div className="w-1/2">
                {viewing && <ProjectCardDetail projectObject={viewing} />}
              </div>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </EnrolledProjProvider>
    </div>
  );
};

export default Project;
