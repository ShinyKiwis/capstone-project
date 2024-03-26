"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { useUser } from "../hooks";

interface ProjectContextProps {
  projects: Project[];
  specializedProjects: Project[];
  capstoneProjects: Project[];
  projectsAreFetching: boolean;
  setProjects: (projects: Project[]) => void;
  viewing?: Project;
  setViewing: (viewing: Project) => void;
  getProjects: (stage: string | null) => void;
  //   getProjects: (ownerId?: number, status?: string, stage?: number) => void;
  //   handleEnrollment: (projectId: number) => void;
  //   handleUnenrollment: (projectId: number) => void;
  // handleDeletion: (projectId: number) => void;
}

export const ProjectContext = createContext<ProjectContextProps | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [specializedProjects, setSpecializedProjects] = useState<Project[]>([]);
  // const [capstoneProjects, setCapstoneProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewing, setViewing] = useState<Project | undefined>();
  //   const user= useUser()

  const queryClient = useQueryClient();
  const {data:specializedProjects, isLoading:specializedProjectsIsLoading} = useQuery({
    queryFn: async () => {
      
      let response = await (
        await axios.get(`http://localhost:3500/projects?stage=1`)
      ).data;
      console.log("refetched specialized projects");
      // setSpecializedProjects(response.projects);
      return response.projects;
    },
    queryKey: ["projects", { stage: 1 }],
    enabled: true,
    staleTime: Infinity,
  });


  const {data:capstoneProjects, isFetching:CapstoneProjectsIsLoading} = useQuery({
    queryFn: async () => {
      let response = await (
        await axios.get(`http://localhost:3500/projects?stage=2`)
      ).data;
      console.log("refetch capstone projects");
      // setCapstoneProjects(response.projects);
      return response.projects;
    },
    queryKey: ["projects", { stage: 2 }],
    enabled: true,
    staleTime: Infinity,
  });

  var projectsAreFetching =
    specializedProjectsIsLoading || CapstoneProjectsIsLoading;

  function getProjects(stage: string | null, viewingId?: number) {
    if (!stage) return;
    if (!projectsAreFetching)
      if (stage === "specialized") {
        setProjects(specializedProjects);
        setViewing(specializedProjects[0]);
      } else {
        setProjects(capstoneProjects);
        setViewing(capstoneProjects[0]);
      }

    // var retry = 5;
    // // Retry setting projects list (wait for query to finish fetching)
    // const interval = setInterval(() => {
    //   // console.log("Waiting...", retry);
    //   console.log("Tracking:",specializedProjectsIsLoading)
    //   retry -= 1;

    //   if (!specializedProjectsIsLoading ) {
    //     // If the flag is true, resolve the promise and stop the interval
    //     if (stage === "specialized") {
    //       setProjects(specializedProjects || []);
    //       // setViewing(specializedProjects[0]);
    //     } else {
    //       setProjects(CapstoneProjectsData || []);
    //       // setViewing(capstoneProjects[0]);
    //     }
    //     console.log("Loaded", specializedProjects);
    //     clearInterval(interval);
    //   }
    // }, 500);
  }

  // const handleDeletion = (projectId: number) => {
  //   setProjects((projects) =>
  //     projects.filter((project) => project.code != projectId),
  //   );
  //   if (viewing?.code === projectId) {
  //     setViewing(undefined);
  //   }
  // };

  const projectContextValue: ProjectContextProps = {
    projects,
    specializedProjects,
    capstoneProjects,
    projectsAreFetching,
    setProjects,
    viewing,
    setViewing,
    getProjects,
    // handleDeletion
  };

  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("Project context not initialized !");
  }

  return context;
};
