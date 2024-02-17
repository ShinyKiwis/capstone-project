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
import Image from "next/image";
import useUser from "@/app/hooks/useUser";
import hasRole from "@/app/lib/hasRole";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { ProjectContext } from "@/app/providers/ProjectProvider";

const ProjectHeader = ({projects}: {projects: any[]}) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading</div>;
  const { setViewing, setProjects } = projectContext;
  const user = useUser()
  const [projectsPerPage, setProjectsPerPage] = useState("");
  const { toggleModal, setModalType } = modalContextValue;
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    // render search results returned by SearchBox
    if (searchResults && searchResults.length>0){
      setProjects(searchResults)
      setViewing(searchResults[0])
    }
  }, [searchResults]);

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

  const handleApproveAll = () => {
    if(pathname.includes("approve")){
      const projectCodes = projects.map(project => project.code)
      axios.post('http://localhost:3500/projects/approve/all', {
        id: user.id,
        codes: projectCodes
      })
    }
  }

  return (
    <div className="sticky top-0 w-full bg-white pt-2">
      <div className="w-3/6">
        <div className="mt-4 flex gap-4">
          <div className="w-10/12">
            <SearchBox placeholder="Search projects..." resultSetter={setSearchResults}/>
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
              <Button
                isPrimary
                variant={pathname.includes("approve") ? "success" : "normal"}
                className="px-4 py-2"
                onClick={handleApproveAll}
              >
                <Link
                  href={`/project/approve?project=${searchParams.get(
                    "project",
                  )}`}
                  className="flex items-center gap-2"
                >
                  <FaCheckCircle size={23} />
                  {pathname.includes("approve")
                    ? "Approve all"
                    : "Approve projects"}
                </Link>
              </Button>
            )}
            {!pathname.includes("approve") && (
              <>
                <Button isPrimary variant="normal" className="px-4 py-2">
                  <Link
                    href={`/project/create?project=${searchParams.get(
                      "project",
                    )}`}
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
              </>
            )}
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
  const user = useUser()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading</div>;
  const { projects, viewing, setViewing, getProjects } = projectContext;
  useEffect(()=>{
    const isNotStudent = user.roles.find(role => role.name.toLowerCase() == "student")?.name.toLowerCase() !== 'student'
    const stage = searchParams.get("project") === 'specialized' ? 1:2  

    if(isNotStudent) {
      const status = pathname.includes("approve") ? "":""
      getProjects(user.id,status,stage)
    }else{
      getProjects(0,"APPROVED",stage)
    }
  }, [])

  return (
    <div className="w-full flex-1 flex flex-col">
      <ProjectHeader projects={projects}/>
      <div className="mt-4 flex flex-1 gap-4 overflow-hidden">
        {projects.length != 0 ? (
          <>
            <div className="flex flex-col w-1/2 min-h-0 gap-4 overflow-y-auto">
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

            <div className="w-1/2 overflow-y-auto">
              {viewing && <ProjectCardDetail projectObject={viewing} />}
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Project;
