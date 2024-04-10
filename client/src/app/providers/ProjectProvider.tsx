"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { isStudent } from "../lib/isStudent";
import { userHasRole } from "../lib/userHasResource";
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

  const {user} = useAuth();

  var userRoleParams = '';
  if (userHasRole('Student')){
    userRoleParams = '&status=APPROVED';
  }
  if (userHasRole('DepartmentHead')){
    userRoleParams = '&status=WAITING_FOR_DEPARTMENT_HEAD';
  }
  if (userHasRole('ProgramChair')){
    userRoleParams = '&status=WAITING_FOR_PROGRAM_CHAIR';
  }

  function filterOtherDrafts(retreivedProjects: Project[]){
    // console.log("Called filter");
    // retreivedProjects.forEach(project => {console.log(!(project.status === 'DRAFT' && project.owner.id != user?.id))})
    // Filter out draft projects not belong to current teacher; dept head and program chair should not see other teacher's draft projects
    let filteredProjects = retreivedProjects.filter(project => !(project.status === 'DRAFT' && project.owner.id != user?.id))
    if (userHasRole('DepartmentHead', undefined, user) || userHasRole('ProgramChair', undefined, user)){
      filteredProjects = filteredProjects.filter(project => project.status != 'DRAFT')
    }
    return filteredProjects;
  }

  const queryClient = useQueryClient();

  const {
    data: specializedProjects = [],
    isLoading: specializedProjectsIsLoading,
  } = useQuery({
    queryFn: async () => {
      let queryURL = `http://localhost:3500/projects?stage=1${userRoleParams}&page=${currentPage}&limit=${paginationSize}`;
      let response = await (await axios.get(queryURL)).data;
      console.log("refetched specialized projects");
      // if (renderingProjectsKey.includes('specialized') && !renderingProjectsKey.includes('searched'))
      //   setCurrMaxPages(response.total)
      // setSpecializedPages(response.total)
      if (!isStudent(user)) response.projects = filterOtherDrafts(response.projects);
      return response;
    },
    queryKey: ["projects", "specialized"],
    enabled: true,
    staleTime: Infinity,
  });

  const { data: capstoneProjects = [], isFetching: CapstoneProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let response = await (
          await axios.get(
            `http://localhost:3500/projects?stage=2${userRoleParams}&page=${currentPage}&limit=${paginationSize}`,
          )
        ).data;
        console.log("refetch capstone projects");
        // if (renderingProjectsKey.includes('capstone') && !renderingProjectsKey.includes('searched'))
        //   setCurrMaxPages(response.total)
        // setCapstonePages(response.total);
        if (!isStudent(user)) response.projects = filterOtherDrafts(response.projects);
        return response;
      },
      queryKey: ["projects", "capstone"],
      enabled: true,
      staleTime: Infinity,
    });

  const { data: searchedProjects = [], isFetching: searchedProjectsIsLoading } =
    useQuery({
      queryFn: async () => {
        let searchURL = `http://localhost:3500/projects?stage=${renderingProjectsKey[1] === "specialized" ? 1 : 2}${userRoleParams}&page=${currentPage}&limit=${paginationSize}&search=${savedSearch}`;
        let response = await (await axios.get(searchURL)).data;
        console.log("refetch searched projects");
        console.log("Search URL:", searchURL);
        // if (renderingProjectsKey.includes('searched'))
        //   setCurrMaxPages(response.total)
        // setSearchedPages(response.total);
        if (!isStudent(user)) response.projects = filterOtherDrafts(response.projects);
        return response;
      },
      queryKey: ["projects", renderingProjectsKey[1], "searched"],
      enabled: true,
      staleTime: Infinity,
    });

  var projectsAreFetching =
    specializedProjectsIsLoading || CapstoneProjectsIsLoading;

  async function getProjects(stage: string | null, viewingId?: number) {
    // Get projects for initial view page, only use for switching project type
    if (!stage) return;

    axios
      .get(
        `http://localhost:3500/projects?stage=${stage === "specialized" ? 1 : 2}${userRoleParams}&page=1&limit=10`,
      )
      .then((response) => {
        // console.log("Get new projects list", response);
        setRenderingProjectsKey(["projects", stage]);
        setsavedSearch('')
        if (!isStudent(user)) response.data.projects = filterOtherDrafts(response.data.projects);
        setProjects(response.data.projects);
        setViewing(response.data.projects[0]);
        setCurrentPage(1);
        setPaginationSize("10");
        setCurrMaxPages(response.data.total);
      })
      .catch((err) => console.log("Error getProjects", err));
  }

  const refreshProjects = async () => {
    // console.log("Current refresh key:", renderingProjectsKey);

    // Refresh rendering project page
    var refreshedProjects: { total: number; projects: Project[] } =
      queryClient.getQueryData(renderingProjectsKey || []) || {
        total: 0,
        projects: [],
      };
    // console.log("Refreshed data:", refreshedProjects);

    setProjects(refreshedProjects.projects);
    let prevViewingId = viewing?.code;
    var refreshedViewing = refreshedProjects.projects.find(
      (project) => project.code === prevViewingId,
    );
    setViewing(refreshedViewing || refreshedProjects.projects[0]);
    setCurrMaxPages(refreshedProjects.total);
  };

  const invalidateAndRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: renderingProjectsKey });
    refreshProjects();
  };

  const handleSearchProjects = async (
    searchkw: string | null,
    stage: string | null,
  ) => {
    if (searchkw != null) {
      if (!renderingProjectsKey.includes("searched")) {
        setRenderingProjectsKey([...renderingProjectsKey, "searched"]);
      }

      setsavedSearch(searchkw || "");
    }
  };
  // Handle search, filter when new search params is detected
  useEffect(() => {
    const waitAndRefresh = async () => {
      await queryClient.invalidateQueries({
        queryKey: renderingProjectsKey,
        exact: true,
      });
      refreshProjects();
    };

    if (renderingProjectsKey.includes("searched")) waitAndRefresh();
  }, [savedSearch]);

  // Handle page switching, page size changing
  useEffect(() => {
    const waitAndRefresh = async () => {
      await queryClient.invalidateQueries({
        queryKey: renderingProjectsKey,
        exact: true,
      });
      refreshProjects();
    };

    waitAndRefresh();
  }, [currentPage, paginationSize]);

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
