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
  QueryKey,
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
  setRenderingProjectsKey: (newkey: QueryKey) => void;
  getProjects: (stage: string | null) => void;
  refreshProjects: () => void;
  handleSearchProjects: (search: string, stage: string) => void;
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
  const [renderingProjectsKey, setRenderingProjectsKey] = useState<QueryKey>([
    "projects",
    "specialized",
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewing, setViewing] = useState<Project | undefined>();
  const [savedSearch, setsavedSearch] = useState("");
  const [paginationSize, setPaginationSize] = useState("10");
  //   const user= useUser()

  const queryClient = useQueryClient();
  const { data: specializedProjects, isLoading: specializedProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let response = await (
          await axios.get(`http://localhost:3500/projects?stage=1`)
        ).data;
        console.log("refetched specialized projects");
        // setSpecializedProjects(response.projects);
        return response.projects;
      },
      queryKey: ["projects", "specialized"],
      enabled: true,
      staleTime: Infinity,
    });

  const { data: capstoneProjects, isFetching: CapstoneProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let response = await (
          await axios.get(`http://localhost:3500/projects?stage=2`)
        ).data;
        console.log("refetch capstone projects");
        // setCapstoneProjects(response.projects);
        return response.projects;
      },
      queryKey: ["projects", "capstone"],
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
  }

  const refreshProjects = () => {
    console.log("Current refresh key:", renderingProjectsKey);
    // Refresh searched/filtered projects
    if (renderingProjectsKey.includes("search")) {
      console.log("Refresing searched projects...");
      handleSearchProjects(null, null);
      return;
    }

    // Refresh all projects list
    var refreshedProjects: Project[] =
      queryClient.getQueryData(renderingProjectsKey || []) || projects;
    setProjects(refreshedProjects);
    let prevViewingId = viewing?.code;
    var refreshedViewing = refreshedProjects.find(
      (project) => project.code === prevViewingId,
    );
    setViewing(refreshedViewing || viewing);
  };

  const handleSearchProjects = async (
    searchkw: string | null,
    stage: string | null,
  ) => {
    let searchURL = "";
    if (searchkw === null && stage === null) {
      searchURL = savedSearch;
    } else {
      searchURL = `http://localhost:3500/projects?search=${searchkw}&stage=${stage === "specialized" ? "1" : "2"}&page=1&limit=${paginationSize}`;
      setsavedSearch(searchURL);
    }

    axios
      .get(searchURL)
      .then((res) => {
        setRenderingProjectsKey(["projects", "search"]);
        setProjects(res.data.projects);
        let lastViewing = res.data.projects.find((project: Project) => project.code === viewing?.code,)
        setViewing(lastViewing || res.data.projects[0]);
      })
      .catch((err) => console.error("Error searching project:", err));
  };

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
    setRenderingProjectsKey,
    refreshProjects,
    handleSearchProjects,
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
