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
  renderingProjectsKey: QueryKey;
  setRenderingProjectsKey: (newkey: QueryKey) => void;
  getProjects: (stage: string | null) => void;
  refreshProjects: () => void;
  invalidateAndRefresh: () => void;
  handleSearchProjects: (search: string, stage: string) => void;
  paginationSize: string;
  setPaginationSize: (newSize: string) => void;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  currMaxPages: number;
  setCurrMaxPages: (newMaxPages: number) => void;
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
    { page: 1, pageSize: "10" },
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewing, setViewing] = useState<Project | undefined>();
  const [savedSearch, setsavedSearch] = useState("");
  const [paginationSize, setPaginationSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [currMaxPages, setCurrMaxPages] = useState(1);

  // const [specializedPages, setSpecializedPages] = useState(1);
  // const [capstonePages, setCapstonePages] = useState(1);
  // const [searchedPages, setSearchedPages] = useState(1);
  const queryClient = useQueryClient();

  const { data: specializedProjects, isLoading: specializedProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let response = await (
          await axios.get(
            `http://localhost:3500/projects?stage=1&page=${currentPage}&limit=${paginationSize}`,
          )
        ).data;
        console.log("refetched specialized projects");
        if (renderingProjectsKey.includes('specialized') && !renderingProjectsKey.includes('searched'))
          // setSpecializedPages(response.total)
          setCurrMaxPages(response.total)
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
          await axios.get(
            `http://localhost:3500/projects?stage=2&page=${currentPage}&limit=${paginationSize}`,
          )
        ).data;
        console.log("refetch capstone projects");
        if (renderingProjectsKey.includes('capstone') && !renderingProjectsKey.includes('searched'))
          setCurrMaxPages(response.total)
        // setCapstonePages(response.total);
        return response.projects;
      },
      queryKey: ["projects", "capstone"],
      enabled: true,
      staleTime: Infinity,
    });

    const { data: searchedProjects, isFetching: searchedProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let searchURL = `http://localhost:3500/projects?stage=${renderingProjectsKey[1] === 'specialized' ? 1 : 2}&page=${currentPage}&limit=${paginationSize}&search=${savedSearch}`;
        let response = await (
          await axios.get(searchURL)
        ).data;
        console.log("refetch searched projects");
        if (renderingProjectsKey.includes('searched'))
          setCurrMaxPages(response.total)
        // setSearchedPages(response.total);
        return response.projects;
      },
      queryKey: ["projects", renderingProjectsKey[1], "searched"],
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
        if (viewingId)
          setViewing(
            specializedProjects.find(
              (project: Project) => project.code === viewingId,
            ) || specializedProjects[0],
          );
        else setViewing(specializedProjects[0]);
        
        // setCurrMaxPages(specializedPages);
      } 
      else {
        setProjects(capstoneProjects);
        if (viewingId)
          setViewing(
            capstoneProjects.find(
              (project: Project) => project.code === viewingId,
            ) || capstoneProjects[0],
          );
        else setViewing(capstoneProjects[0]);
        
        // setCurrMaxPages(capstonePages)
      }
  }

  const refreshProjects = async () => {
    // console.log("Current refresh key:", renderingProjectsKey);

    // Refresh rendering project page
    var refreshedProjects: Project[] =
      queryClient.getQueryData(renderingProjectsKey || []) || projects;
    // console.log("Refreshed data:", refreshedProjects);

    setProjects(refreshedProjects);
    let prevViewingId = viewing?.code;
    var refreshedViewing = refreshedProjects.find(
      (project) => project.code === prevViewingId,
    );
    setViewing(refreshedViewing || viewing);

    // if (renderingProjectsKey.includes('searched'))
    //   setCurrMaxPages(searchedPages)
    // else if (renderingProjectsKey.includes('specialized'))
    //   setCurrMaxPages(specializedPages)
    // else
    //   setCurrMaxPages(capstonePages)
  };

  const invalidateAndRefresh = async() => {
    await queryClient.invalidateQueries({queryKey: renderingProjectsKey})
    refreshProjects();
  }

  const handleSearchProjects = async (
    searchkw: string | null,
    stage: string | null,
  ) => {
    if (searchkw != null){
      if (!renderingProjectsKey.includes("searched")){
        setRenderingProjectsKey([...renderingProjectsKey, "searched"])
      }
        
      setsavedSearch(searchkw || '')
    }
  };
  // Handle search, filter when new search params is detected
  useEffect(() => {
    const waitAndRefresh = async () => {
      await queryClient.invalidateQueries({ queryKey: renderingProjectsKey, exact:true });
      refreshProjects();
    };

    if (renderingProjectsKey.includes('searched'))
      waitAndRefresh();
  }, [savedSearch]);

  // Handle page switching, page size changing
  useEffect(() => {
    const waitAndRefresh = async () => {
      await queryClient.invalidateQueries({ queryKey: renderingProjectsKey, exact:true });
      refreshProjects();
    };

    waitAndRefresh();
  }, [currentPage, paginationSize]);


  // // Handle changing pagination size
  // useEffect(() => {
  //   const waitAndRefresh = async () => {
  //     await queryClient.invalidateQueries({ queryKey: renderingProjectsKey, exact:true });
  //     refreshProjects();
  //   };

  //   // console.log("New size:", paginationSize);
  //   // console.log("Invalidating:", renderingProjectsKey);
  //   waitAndRefresh();
  // }, [paginationSize]);

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
    renderingProjectsKey,
    setRenderingProjectsKey,
    refreshProjects,
    invalidateAndRefresh,
    handleSearchProjects,
    paginationSize,
    setPaginationSize,
    currentPage,
    setCurrentPage,
    currMaxPages,
    setCurrMaxPages,
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
